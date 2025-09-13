import dotenv from "../src/libs/dotenv";

import DiscordRest from "../src/discord/rest";

const token = dotenv.get("CLIENT_TOKEN", true);

const rest = new DiscordRest( );
rest.setToken(token);

const guild = await rest.getGuild("541757403411120147");
const owner = await rest.getUser(guild.owner_id);

const roles = await rest.getAllGuildRoles(guild.id);
const users = await rest.getAllGuildUsers(guild.id);
const channels = await rest.getAllGuildChannels(guild.id);

const bots = users.filter((user: any) => user.user.bot);

console.log(`Guild name: ${guild.name} (Owner: ${owner.username})`);
console.log(`Roles: ${roles.length}`);
console.log(`Channels: ${channels.length}`);

console.log(`Bots: ${bots.length} (${bots.map((bot: any) => bot.user.username).join(", ")})`);
console.log(`Humans: ${users.length - bots.length}`);