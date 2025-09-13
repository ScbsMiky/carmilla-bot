import dotenv from "./src/libs/dotenv";

import DiscordRest from "./src/discord/rest";
import DiscordGateway from "./src/discord/gateway";

import { GatewayTypes } from "./src/discord/types/gateway";
import { ButtonStyle, ComponentType } from "./src/discord/interactions/interaction";

const rest = new DiscordRest( );
const gateway = new DiscordGateway( );

rest.setToken(dotenv.get("CLIENT_TOKEN", true));

gateway.connect(dotenv.get("CLIENT_TOKEN", true), [
  GatewayTypes.Intents.GuildMessages,
  GatewayTypes.Intents.MessageContent,
  GatewayTypes.Intents.GuildMessageReactions,
]);

let prefix = ".";
let devGuild = "1195565322758013029";

let testImages = [
  "https://img4.gelbooru.com//samples/1e/49/sample_1e49d553cc9e2264b4819efa1c4699fb.jpg",
  "https://img4.gelbooru.com//samples/d6/97/sample_d697ec304bf0ce95741719dc4c81fdd7.jpg",
  "https://img4.gelbooru.com//images/0e/e1/0ee148762a1eaa4c832c4262f67099ec.png",
  "https://img4.gelbooru.com//samples/cd/0b/sample_cd0b9c0bedd8d50f4c6b473e56c46d13.jpg",
  "https://img4.gelbooru.com//images/54/12/541239e84abf5bbd7cd421c1d77901a2.jpg"
];

gateway.listener.on("INTERACTION_CREATE", (interaction) => {
  if(interaction.data.component_type == ComponentType.Button) {
    if(interaction.data.custom_id.startsWith("gallery")) {
      
    };

    return;
  };
});

gateway.listener.on("MESSAGE_CREATE", async function(message) {
  if(message.guild_id != devGuild) {
    return;
  };

  if(message.content == `${prefix}testing`) {
    rest.sendMessage({
      reply: message.id,
      channel_id: message.channel_id,

      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.StringSelect,
              
              custom_id: "string_select_test",

              options: [
                {
                  label: "String 1",
                  value: "string_1"
                },
                {
                  label: "String 2",
                  value: "string_2"
                },
                {
                  label: "String 3",
                  value: "string_3"
                }
              ]
            }
          ]
        }
      ]
    });

    return;
  };
});

function inline(cols: string[ ][ ], options?: { spacing?: number; }) {
  options = options ?? {};
  const spacing = Math.max(options.spacing ?? 1);

  const lengths = cols[0]!.map((_, colIndex) => Math.max(...cols.map(row => (row[colIndex] ?? "").length)));

  let lines = cols.map(row => row
    .map((cell, i) =>(cell ?? "").padEnd(lengths[i]! + spacing, " "))
    .join("")
  );

  return lines;
};