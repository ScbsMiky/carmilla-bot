import dotenv from "../src/libs/dotenv";

import DiscordRest from "../src/discord/rest";
import DiscordGateway from "../src/discord/gateway";
import { GatewayTypes } from "../src/discord/types/gateway";

const token = dotenv.get("CLIENT_TOKEN", true);

const rest = new DiscordRest( );
const gateway = new DiscordGateway( );

rest.setToken(token);

gateway.connect(token, [
  GatewayTypes.Intents.GuildMessages,
  GatewayTypes.Intents.MessageContent
]);

gateway.listener.on("MESSAGE_CREATE", function(message) {
  if(message.content == ".embed-test") {
    rest.sendMessage({
      channel_id: message.channel_id,
      embeds: [{
        title: "Embed test",
        description: "This is a embed test",
        color: 0xffffff
      }]
    });

    return;
  };

  if(message.content == ".reply-test") {
    rest.sendMessage({
      reply: message.id,
      channel_id: message.channel_id,
      content: `Hello <@${message.author.id}> ! How are you ?`
    });

    return;
  };
});