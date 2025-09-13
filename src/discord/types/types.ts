import type { Component } from "../interactions/interaction";

export interface Clan {

};

export interface Collectible {

};

export interface Member {
  nick: string;
  banner: string;
  avatar: string;
  joined_at: string;
  communication_disabled_until: string;

  flags: number;

  mute: boolean
  deaf: boolean;
  pedding: boolean;
  
  premium_since: null;

  roles: string[ ];
};

export interface User {
  id: string;
  avatar: string;
  username: string;
  global_name: string;
  discriminator: string;

  public_flags: number;
  
  display_name_styles: null;
  avatar_decoration_data: null;
  
  clan: Clan;
  primary_guild: Clan;
  
  collectibles: Record<string, Collectible>;
};

export interface Message {
  id: string;
  nonce: string;
  content: string;
  timestamp: string;
  channel_id: string;
  edited_timestamp: string;

  type: number;
  flags: number;
  channel_type: number;

  tts: boolean;
  pinned: boolean;
  mention_everyone: boolean;

  author: User;
  
  member?: Member;
  guild_id?: string;

  embeds: [ ];
  mentions: [ ];
  components: [ ];
  attachments: [ ];
  mention_roles: string[ ];
  
  message_reference: {
    guild_id?: string;
    
    type: number;
    message_id: string;
    channel_id: string;
  };

  referenced_message: Omit<Message, "referenced_message">;
};

export interface Reaction {
  guild_id?: string;
  
  user_id: string;
  message_id: string;
  channel_id: string;
  message_author_id: string;


  member?: Member & { user: User };
  
  type: number;

  burst: boolean;

  emoji: {
    id: string;
    name: string;
    animated: boolean;
  };
};

export interface MessageReferrence {
  guild_id?: string;
  message_id: string;
  channel_id: string;
};

export interface Emoji {
  id: string;
  name: string;
  
  managed: boolean;
  animated: boolean;
  available: boolean;
  require_color: boolean;

  roles: string[ ];
};

export interface Role {
  id: string;
  name: string;
  icon: string;
  description: string;
  permissions: string;
  unicode_emoji: string;

  color: number;
  flags: number;
  position: number;

  hoist: boolean;
  managed: boolean;
  mentionable: boolean;

  colors: {
    primary_color: string;
    tertiary_color: string;
    secondary_color: string;
  };

  tags: Record<string, number>;
};

export interface Sticker {
  id: string;
  name: string;
  tags: string;
  asset: string;
  guild_id: string;
  description: string;

  type: number;
  format_type: number;
  
  available: boolean;
};

export interface Guild {
  id: string;
  icon: string;
  banner: string;
  region: string;
  splash: string;
  guild_id: string;
  owner_id: string;
  home_header: string;
  description: string;
  afk_channel_id: string;
  application_id: string;
  banity_url_code: string;
  preferred_locale: string;
  rules_channel_id: string;
  discovery_splash: string;
  widget_channel_id: string;
  safety_alerts_channel_id: string;
  public_updates_channel_id: string;
  latest_onboarding_question_id: string;

  nsfw: boolean;
  widget_enabled: boolean;
  premium_progress_bar_enabled: boolean;

  version: number;
  hub_type: number;
  mfa_level: number;
  max_members: number;
  afk_timeout: number;
  premium_tier: number;
  max_presences: number;
  verification_level: number;
  explicit_content_filter: number;
  max_video_channel_users: number;
  premium_subscription_count: number;
  default_message_notifications: number;
  max_stage_video_channel_users: number;

  roles: Role[ ];
  emojis: (Emoji & { user: User; })[ ];
  stickers: (Sticker & { user: User; })[ ];

  features: string[ ];
  incidents_data: any[ ];
};

export interface GuildPreview {
  id: string;
  name: string;
  icon: string;
  banner: string;
  permissions: string;
  
  features: string[ ];
};

export interface MessagePayload {
  channel_id: string;
  
  reply?: string;
  content?: string;
  guild_id?: string;
  
  isComponentV2?: boolean;
  
  embeds?: Embed[ ];
  components?: Component[ ];
  
  attachments?: {
    id: number;
    path: string;
    filename?: string;
    content_type?: string;
  }[ ];
};

export enum EmbedType {
  Rich = "rich",
  Image = "image",
  Video = "video",
  GIFV = "gifv",
  Article = "article",
  PollResult = "poll_result"
};

export interface EmbedImageThumbVideo {
  url: string;
  proxy_url?: string;

  width?: number;
  height?: number
};

export interface Embed {
  url?: string;
  title?: string;
  timestamp?: string;
  description?: string;

  color?: number;

  image?: EmbedImageThumbVideo;
  video?: EmbedImageThumbVideo;
  thumbnail?: EmbedImageThumbVideo;

  footer?: {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };

  author?: {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };

  provider?: {
    url?: string;
    name?: string;
  };

  fields?: {
    name: string;
    value: string;
  }[ ];
};

export interface Attachment {
  id: string;
  url: string;
  filename: string;

  size: number;
  
  title?: string;
  waveform?: string;
  proxy_url: string;
  description?: string;
  content_type?: string;

  width?: number;
  flags?: number;
  height?: number;
  duration_secs?: number;
  
  ephemeral?: boolean;
};

export enum ChannelType {
  // GUILD_TEXT	0	a text channel within a server
  // DM	1	a direct message between users
  // GUILD_VOICE	2	a voice channel within a server
  // GROUP_DM	3	a direct message between multiple users
  // GUILD_CATEGORY	4	an organizational category that contains up to 50 channels
  // GUILD_ANNOUNCEMENT	5	a channel that users can follow and crosspost into their own server (formerly news channels)
  // ANNOUNCEMENT_THREAD	10	a temporary sub-channel within a GUILD_ANNOUNCEMENT channel
  // PUBLIC_THREAD	11	a temporary sub-channel within a GUILD_TEXT or GUILD_FORUM channel
  // PRIVATE_THREAD	12	a temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission
  // GUILD_STAGE_VOICE	13	a voice channel for hosting events with an audience
  // GUILD_DIRECTORY	14	the channel in a hub containing the listed servers
  // GUILD_FORUM	15	Channel that can only contain threads
  // GUILD_MEDIA	16
};