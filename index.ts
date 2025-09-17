import dotenv from "./src/libs/dotenv";
import { Schema } from "./src/libs/schema";

import DiscordRest from "./src/discord/core/rest";
import DiscordGateway from "./src/discord/core/gateway";

export default {
  Schema: Schema,
  
  Rest: DiscordRest,
  Gateway: DiscordGateway,
  
  utils: {
    dotenv: dotenv
  }
};