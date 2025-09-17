import EventListener from "../../libs/listener";
import { randomInt } from "../../libs/random";
import type { Message, Reaction } from "../types/types";

export interface CollectorOptions<T extends any> {
  type: keyof typeof collectorsMap;
  filter(...args: T[ ]): boolean;

  key?: string;
  max?: number;
};

export interface CollectorEvents<T extends any> {
  collect: T;
  timeout: [];
  dispose: [string];
};

export type CollectorFn<T extends any[ ]> = (...args: T) => any;

export const collectorsMap = {
  message: new Map( ),
  reaction: new Map( )
};

export function createCollector<T extends any = any>(options: CollectorOptions<T>) {
  let id = `${options.type}_${randomInt(Date.now( ))}${options.key ? `_${options.key}` : ""}`;

  let listener = (new EventListener( )) as any as (EventListener<CollectorEvents<T>> & { dispose( ): any; });

  listener.dispose = (reason?: string) => {
    listener.emit("dispose", reason!);

    listener.removeAllListeners( );
    listener = undefined as any;

    collectorsMap[options.type].delete(id);
  };

  collectorsMap[options.type].set(id, {
    id,
    key: options.key,
    max: options.max,
    type: options.type,
    count: 0,
    filter: options.filter,
    listener
  });

  return listener;
};

export async function awaitCollector<T extends any = any>(options: Omit<CollectorOptions<T>, "type" | "max">) {
  // @ts-ignore
  options.max = 1;

  return new Promise<T>((resolve, reject) => {
    const collector = createMessageCollector(options as any);
    
    collector.on("collect", resolve as any);

    collector.on("dispose", reject);
    collector.on("timeout", ( ) => reject("Timeout"));
  });
};

export async function awaitMessage(options: Omit<CollectorOptions<Message>, "type" | "max">) {
  // @ts-ignore
  options.max = 1;
  
  return new Promise<Message>((resolve, reject) => {
    const collector = createMessageCollector(options);
    
    collector.on("collect", resolve as any);

    collector.on("dispose", reject);
    collector.on("timeout", ( ) => reject("Timeout"));
  });
};

export async function awaitReaction(options: Omit<CollectorOptions<Reaction>, "type" | "max">) {
  // @ts-ignore
  options.max = 1;
  
  return new Promise<Reaction>((resolve, reject) => {
    const collector = createReactionCollector(options);
    
    collector.on("collect", resolve as any);

    collector.on("dispose", reject);
    collector.on("timeout", ( ) => reject("Timeout"));
  });
};

export function createMessageCollector(options: Omit<CollectorOptions<Message>, "type">) {
  // @ts-ignore
  options.type = "message";
  return createCollector(options as any as typeof options & { type: "message" });
};

export function createReactionCollector(options: Omit<CollectorOptions<Reaction>, "type">) {
  // @ts-ignore
  options.type = "reaction";
  return createCollector(options as any as typeof options & { type: "reaction" });
};