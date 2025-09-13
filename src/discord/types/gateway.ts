import type { Interaction } from "../interactions/interaction";
import type { Message, MessageReferrence, Reaction, Role, } from "./types";

export namespace GatewayTypes {
  export enum Opcode {
    Hello = 10,
    Resume = 6,
    Dispatch = 0,
    Identify = 2,
    Heartbeat = 1,
    Reconnect = 7,
    HeartbeatACK = 11,
    PresenceUpdate = 3,
    InvalidSession = 9,
    VoiceStateUpdate = 4,
    RequestGuildMembers = 8,
    RequestSoundboardSounds = 31
  };

  export enum Intents {
    Guilds = 0,
    GuildInvites = 6,
    GuildMembers = 1,
    GuildMessages = 9,
    GuildWebhooks = 5,
    GuildPresences = 8,
    GuildModeration = 2,
    GuildVoiceStates = 7,
    GuildExpressions = 3,
    GuildIntegrations = 4,
    GuildMessagePolls = 24,
    DirectMessagePolls = 25,
    GuildMessageTyping = 11,
    GuildScheduledEvents = 16,
    GuildMessageReactions = 10,
    
    MessageContent = 15,
    
    DirectMessages = 12,
    DirectMessagetyping = 14,
    DirectMessageReactions = 13,
    
    AutoModerationExecution = 21,
    AutoModerationConfiguration = 20,
  };

  export interface Payload {
    code: Opcode;
    data: any;
    type: string;
    sequence: number;
  };
  
  export interface Events {
    GATEWAY_OPEN: [ ];
    GATEWAY_ERROR: [Error];
    GATEWAY_CLOSE: [string, number];

    READY: [ ];

    ROLE_CREATE: [Role];
    ROLE_DELETE: [ ];
    ROLE_UPDATE: [ ];

    EMOJI_CREATE: [ ];
    EMOJI_DELETE: [ ];
    EMOJI_UPDATE: [ ];

    STICKER_CREATE: [ ];
    STICKER_DELETE: [ ];
    STICKER_UPDATE: [ ];
    
    MESSAGE_CREATE: [Message];
    MESSAGE_UPDATE: [Message];
    MESSAGE_DELETE: [MessageReferrence];
    
    CHANNEL_CREATE: [ ];
    CHANNEL_UPDATE: [ ];
    CHANNEL_DELETE: [ ];

    INTERACTION_CREATE: [Interaction];
    INTERACTION_UPDATE: [Interaction];

    MESSAGE_REACTION_ADD: [Reaction];
    MESSAGE_REACTION_REMOVE: [Reaction & { guild_id?: string; }];
    MESSAGE_REACTION_REMOVE_ALL: [MessageReferrence];
    MESSAGE_REACTION_REMOVE_EMOJI: [Reaction & { guild_id?: string; }];
  };
};