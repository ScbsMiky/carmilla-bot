import fs from "fs";
import axios, { type AxiosRequestConfig } from "axios";

import FormData from "form-data";
import type { MessagePayload } from "./types/types";

export default class DiscordRest {
  #token = "";

  public url;
  public version;

  public async request(options: AxiosRequestConfig) {
    options.headers = options.headers ?? { };

    options.headers.Authorization = `Bot ${this.#token}`;

    return axios(options)
      .then((response) => response.data);
  };

  public setToken(token: string) {
    this.#token = token;

    return this;
  };

  // single
  async getGuild(guild_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}` });
  };

  async getGuildPreview(guild_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/preview` });
  };

  async getRole(guild_id: string, role_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/roles/${role_id}` });
  };

  async getUser(user_id: string) {
    return this.request({ url: `${this.url}/users/${user_id}` });
  };

  async getMember(guild_id: string, user_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/members/${user_id}` });
  };

  async getEmoji(guild_id: string, emoji_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/emojis/${emoji_id}` });
  };

  async getChannel(channel_id: string) {
    return this.request({ url: `${this.url}/channels/${channel_id}` });
  };

  async getSticker(guild_id: string, sticker_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/stickers/${sticker_id}` });
  };

  // all
  async getAllGuilds( ) {
    return this.request({ url: `${this.url}/users/@me/guilds` });
  };

  async getAllGuildRoles(guild_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/roles` });
  };

  async getAllGuildUsers(guild_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/members?limit=1000` });
  };

  async getAllGuildEmojis(guild_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/emojis` });
  };

  async getAllGuildChannels(guild_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/channels` });
  };

  async getAllGuildStickers(guild_id: string) {
    return this.request({ url: `${this.url}/guilds/${guild_id}/stickers` });
  };

  // edit //

  async editRole( ) {
    return;
  };

  async createRole( ) {
    return;
  };

  async deleteRole( ) {
    return;
  };

  async editEmoji( ) {
    return;
  };

  async createEmoji( ) {
    return;
  };

  async deleteEmoji( ) {
    return;
  };

  async editChannel( ) {
    return;
  };

  async createChannel( ) {
    return;
  };

  async deleteChannel( ) {
    return;
  };
  
  async editSticker( ) {
    return;
  };

  async createSticker( ) {
    return;
  };

  async deleteSticker( ) {
    return;
  };

  // utils //

  async sendMessage(message: MessagePayload) {
    delete message["isComponentV2"];

    if(message.reply) {
      // @ts-ignore
      message.message_reference = {
        message_id: message.reply,
        channel_id: message.channel_id
      };

      delete message["reply"];
    };

    if(message.attachments) {
      const form = new FormData( );

      form.append("payload_json", JSON.stringify(message));
      
      message.attachments.forEach((attachment, index) => {
        form.append(`files[${index}]`, fs.createReadStream(attachment.path), {
          filename: attachment.filename,
          contentType: attachment.content_type
        });
      });

      return this.request({
        url: `${this.url}/channels/${message.channel_id}/messages`,
        data: form,
        method: "post"
      });
    };

    return this.request({
      url: `${this.url}/channels/${message.channel_id}/messages`,
      data: message,
      method: "post",
    });
  };

  async editMessage(message: MessagePayload) {
    delete message["isComponentV2"];

    if(message.reply) {
      // @ts-ignore
      message.message_reference = {
        message_id: message.reply,
        channel_id: message.channel_id
      };

      delete message["reply"];
    };

    if(message.attachments) {
      const form = new FormData( );

      form.append("payload_json", JSON.stringify(message));
      
      message.attachments.forEach((attachment, index) => {
        form.append(`files[${index}]`, fs.createReadStream(attachment.path), {
          filename: attachment.filename,
          contentType: attachment.content_type
        });
      });

      return this.request({
        url: `${this.url}/channels/${message.channel_id}/messages`,
        data: form,
        method: "patch"
      });
    };

    return this.request({
      url: `${this.url}/channels/${message.channel_id}/messages`,
      data: message,
      method: "patch",
    });
  };

  constructor(version = "10") {
    this.url = `https://discord.com/api/v${version}`;
    this.version = version;
  };
};