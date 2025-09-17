import fs from "fs";
import axios, { type AxiosRequestConfig } from "axios";

import FormData from "form-data";
import type { MessagePayload } from "../types/types";
import RestMessageRouter from "../rest/message";
import RestChannelRouter from "../rest/channel";
import RestGuildRouter from "../rest/guild";

export default class DiscordRest {
  #token = "";

  public url;
  public version;

  public endpoint(url: string) {
    if(url.startsWith("/")) {
      url = url.slice(1);
    };

    return `${this.url}/${url}`;
  };

  public async request<T extends any = any>(options: AxiosRequestConfig) {
    options.headers = options.headers ?? { };

    options.headers.Authorization = `Bot ${this.#token}`;

    return axios(options)
      .then((response) => response.data as T);
  };

  public setToken(token: string) {
    this.#token = token;

    return this;
  };

  public guilds = new RestGuildRouter(this);

  public messages = new RestMessageRouter(this);
  
  public channels = new RestChannelRouter(this);

  constructor(version = "10") {
    this.url = `https://discord.com/api/v${version}`;
    this.version = version;
  };
};