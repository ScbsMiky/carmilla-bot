import fs from "fs";
import FormData from "form-data";

import type DiscordRest from "../core/rest";

import type { Message, MessagePayload } from "../types/types";

export default class RestMessageRouter {
  #api;

  public payload(message: MessagePayload & { isEdit?: boolean }) {
    if(message.isComponentV2) {
      (message as any).flags = 1 << 15;

      delete message["isComponentV2"];
    };

    if(message.reply) {
      (message as any).message_reference = {
        message_id: message.reply,
        channel_id: message.channel_id
      };

      delete message["reply"];
    };

    if(message.attachments && message.attachments.length) {
      let form = new FormData( );

      form.append("payload_json", JSON.stringify(message));

      message.attachments.forEach((attachment) => {
        form.append(`files[${attachment.id}]`, fs.createReadStream(attachment.path), {
          filename: attachment.filename,
          contentType: attachment.content_type
        });
      });

      return form;
    };

    return message;
  };

  public async get(channel_id: string, message_id: string) {
    return this.#api.request<Message>({
      url: `${this.#api.url}/channels/${channel_id}/messages/${message_id}`
    });
  };

  public async send(payload: MessagePayload) {
    return this.#api.request<Message>({
      url: `${this.#api.url}/channels/${payload.channel_id}/messages`,
      data: this.payload(payload),
      method: "post",
    });
  };

  public async edit(payload: MessagePayload & { message_id: string; }) {
    return this.#api.request<Message>({
      url: `${this.#api.url}/channels/${payload.channel_id}/messages/${payload.message_id}`,
      data: this.payload(payload),
      method: "patch",
    });
  };

  public async reply(payload: MessagePayload & { reply: string; }) {
    return this.#api.request<Message>({
      url: `${this.#api.url}/channels/${payload.channel_id}/messages`,
      data: this.payload(payload),
      method: "post",
    });
  };

  public async delete(channel_id: string, message_id: string) {
    return this.#api.request({
      url: `${this.#api.url}/channels/${channel_id}/messages/${message_id}`,
      method: "delete"
    });
  };

  constructor(rest: DiscordRest) {
    this.#api = rest;
  };
};