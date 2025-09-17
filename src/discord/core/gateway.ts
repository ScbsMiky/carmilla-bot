import { WebSocket } from "ws";

import { GatewayTypes } from "../types/gateway";
import type { NotOptional } from "../../types/util";

import EventListener from "../../libs/listener";
import { collectorsMap } from "./collectors";

export default class DiscordGateway {
  #offFn = [ ] as any[ ];
  
  public version;
  public lastSequrence = null as any as number;
  
  public socket!: WebSocket;
  public listener!: EventListener<GatewayTypes.Events>;
  public heartbeat!: NodeJS.Timeout;

  public send(data: NotOptional<GatewayTypes.Payload, "code">) {
    if(!this.socket || this.socket.readyState != this.socket.OPEN) {
      this.#offFn.push(( ) => this.send(data));

      return this;
    };

    (data as any).d = data.data ?? null;
    (data as any).op = data.code ?? null;
    
    if(data.type != null || data.type != undefined) (data as any).t = data.type;
    if(data.sequence != null || data.sequence != undefined) (data as any).q = data.sequence;

    // @ts-ignore
    delete data["code"];
    delete data["data"];
    delete data["type"];
    delete data["sequence"];

    this.socket.send(JSON.stringify(data));

    return this;
  };

  public connect(token: string, intents: GatewayTypes.Intents[ ]) {
    if(this.socket) {
      throw new Error(`Gateway error: socket already connected`);
    };

    this.socket = new WebSocket(`wss://gateway.discord.gg/?v=${this.version}&encoding-json`);

    this.socket.on("open", ( ) => {
      this.#offFn.forEach((fn) => fn( ));
      this.#offFn = [ ];
      this.listener.emit("GATEWAY_OPEN");
    });

    this.socket.on("error", (error) => this.listener.emit("GATEWAY_ERROR", error));

    this.socket.on("close", (code, reason) => this.listener.emit("GATEWAY_CLOSE", reason.toString("utf-8"), code));
    
    this.socket.on("message", (bufferedData) => {
      const json = JSON.parse(bufferedData.toString("utf-8"));

      if(json.s != null && json.s != undefined) {
        this.lastSequrence = json.s;
      };

      console.log(`EVENT ${json.t} (op: ${json.op})`);

      if(json.op == GatewayTypes.Opcode.Dispatch) {
        this.listener.emit(json.t, json.d);

        if(json.t == "MESSAGE_CREATE" || json.t == "MESSAGE_REACTION_ADD") {
          collectorsMap[json.t == "MESSAGE_REACTION_ADD" ? "reaction" : "message"].forEach((collector) => {
            if(collector.filter(json.d)) {
              if(collector.count >= collector.max) {
                collector.listener.dispose("Max");
                return;
              };

              collector.count ++;
              collector.listener.emit("collect", json.d);
            };
          });
        };

        return;
      };

      if(json.op == GatewayTypes.Opcode.Hello) {
        return this.heartbeat = setInterval(( ) => this.send({ code: GatewayTypes.Opcode.Heartbeat, sequence: this.lastSequrence }), json.d.heartbeat_interval)
      };

      if(json.op == GatewayTypes.Opcode.Heartbeat) {
        return this.send({ code: GatewayTypes.Opcode.Heartbeat, sequence: this.lastSequrence });
      };
    });

    this.send({
      code: GatewayTypes.Opcode.Identify,
      data: {
        token,
        intents: intents.reduce((a, b) => a | (1 << b), 0),
        properties: {
          os: "linux",
          device: "chrome",
          browser: "chrome"
        }
      }
    });

    return this;
  };

  constructor(version = "10") {
    this.version = version;
    this.listener = new EventListener( );
  };
};