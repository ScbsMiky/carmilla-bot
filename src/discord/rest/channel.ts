import type DiscordRest from "../core/rest";

import type { Channel, ChannelPayload, ChannelType } from "../types/types";

export default class RestChannelRouter {
  #api;

  public get(channel_id: string) {
    return this.#api.request<Channel>({
      url: this.#api.endpoint(`/channels/${channel_id}`)
    });
  };

  public edit(channel_id: string, payload: ChannelPayload) {
    return this.#api.request<Channel>({
      url: this.#api.endpoint(`/channels/${channel_id}`),
      data: payload,
      method: "patch",
    });
  };
  
  public delete(channel_id: string) {
    return this.#api.request<Channel>({
      url: this.#api.endpoint(`/channels/${channel_id}`),
      method: "delete"
    });
  };
  
  public create(payload: ChannelPayload & { name: string; type: ChannelType; guild_id: string; }) {
    return this.#api.request<Channel>({
      url: this.#api.endpoint(`/guilds/${payload.guild_id}/channels`),
      data: payload,
      method: "post",
    });
  };

  constructor(rest: DiscordRest) {
    this.#api = rest;
  };
};