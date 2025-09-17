import { SignatureKind } from "typescript";
import type DiscordRest from "../core/rest";
import type { Emoji, Role, Sticker, RolePayload, EmojiPayload, StickerPayload } from "../types/types";

export default class RestGuildRouter {
  public static router<T, P>(rest: DiscordRest, name: string) {
    return {
      all: async (guild_id: string) => rest.request<T>({
        url: rest.endpoint(`/guilds/${guild_id}/${name}`)
      }),

      get: async (guild_id: string, emoji_id: string) => rest.request<T>({
        url: rest.endpoint(`/guilds/${guild_id}/${name}/${emoji_id}`)
      }),

      edit: async (payload: P & { guild_id: string }) => rest.request<T>({
        // @ts-ignore
        url: rest.endpoint(`/guilds/${payload.guild_id}/${name}/${payload[`${name.slice(0, -1)}_id`]}`),
        data: payload,
        method: "patch",
      }),

      delete: async (target_id: string) => rest.request<T>({
        // @ts-ignore
        url: rest.endpoint(`/guilds/${payload.guild_id}/${name}/${target_id}`),
        method: "delete"
      }),
      
      create: async (payload: P & { guild_id: string }) => rest.request<T>({
        url: rest.endpoint(`/guilds/${payload.guild_id}/${name}`),
        data: payload,
        method: "post",
      })
    };
  };

  #api;
  
  public roles;
  public emojis;
  public stickers;

  public members = {
    all: async (guild_id: string) => this.#api.request({
      url: this.#api.endpoint(`/guilds/${guild_id}/members`)
    }),

    get: async (guild_id: string, member_id: string) => this.#api.request({
      url: this.#api.endpoint(`/guilds/${guild_id}/members/${member_id}`)
    }),
    
    ban: async (guild_id: string, member_id: string, seconds = 0) => this.#api.request({
      url: this.#api.endpoint(`/guilds/${guild_id}/bans/${member_id}?delete_message_seconds=${seconds}`),
      method: "put"
    }),
    
    kick: async (guild_id: string, member_id: string) => this.#api.request({
      url: this.#api.endpoint(`/guilds/${guild_id}/members/${member_id}`),
      method: "delete"
    }),
    
    unban: async (guild_id: string, member_id: string) => this.#api.request({
      url: this.#api.endpoint(`/guilds/${guild_id}/bans/${member_id}`),
      method: "delete"
    }),

    edit: async (guild_id: string, member_id: string, payload: { }) => this.#api.request({
      url: this.#api.endpoint(`/guilds/${guild_id}/members/${member_id}`),
      data: payload,
      method: "patch"
    })
  };

  public async get(guild_id: string) {
    return this.#api.request({
      url: this.#api.endpoint(`/guilds/${guild_id}`)
    });
  };

  public async all( ) {
    return this.#api.request({
      url: this.#api.endpoint(`/users/@me/guilds`)
    });
  };

  constructor(rest: DiscordRest) {
    this.#api = rest;

    this.roles = RestGuildRouter.router<Role, RolePayload>(this.#api, "roles");
    this.emojis = RestGuildRouter.router<Emoji, EmojiPayload>(this.#api, "emojis");
    this.stickers = RestGuildRouter.router<Sticker, StickerPayload>(this.#api, "stickers");
  };
};