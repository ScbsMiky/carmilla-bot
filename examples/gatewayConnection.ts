import dotenv from "../src/libs/dotenv";

import DiscordGateway from "../src/discord/gateway";

import { GatewayTypes } from "../src/discord/types/gateway";

const gateway = new DiscordGateway( );

const token = dotenv.get("CLIENT_TOKEN", true);
const intents = [ ] as GatewayTypes.Intents[ ];

gateway.connect(token, intents);

gateway.listener.on("READY", function( ) {
  console.log(`Yay !`);
});