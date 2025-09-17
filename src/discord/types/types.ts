import type { Component } from "./interaction";

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
  channel_type: number;
  
  tts: boolean;
  pinned: boolean;
  mention_everyone: boolean;
  
  flags: MessageFlags;
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

export interface Channel {
  id: string;
  name: string;
  last_message_id: string;
  
  type: ChannelType;
  position: number;
  rate_limit_per_user: number;
  
  nsfw: boolean;
  permission_overwrites: [ ];
  
  topic?: string;
  guild_id?: string;
  parent_id?: string;
};

export interface ChannelPayload {
  name?: string;
  parent_id?: string;
  
  position?: number;
  
  type?: ChannelType;
};

export interface RolePayload {
  name: string;
  permissions: string;
  colors: {
    primary_color: string;
    tertiary_color: string;
    secondary_color: string;
  };
  hoist: boolean;
  icon: string;
  unicode_emoji: string;
  mentionable: string;
};

export interface EmojiPayload {
  name: string;
  imageData: string;
  roles?: string[ ];
};

export interface StickerPayload {
  name: string;
  tags: string;
  file: string;
  description: string;
};

export enum ChannelType {
  DM = 1,
  GroupDM = 3,
  
  GuildText = 0,
  GuildVoice = 2,
  GuildForum = 15,
  GuildMedia = 16,
  GuildCategory = 4,
  GuildDirectory = 14,
  GuildStageVoice = 13,
  GuildAnnouncement = 5,
  
  PublicThread = 11,
  PrivateThread = 12,
  AnnouncementThread = 10
};

export enum MessageFlags {
  Crossposted = 0,
  IsCrosspost = 1,
  SuppressEmbeds = 2,
  SourceMessageDeleted = 3,
  Urgent = 4,
  HasThread = 5,
  Ephemeral = 6,
  Loading = 7,
  FailedToMentionSomeRolesInThread = 8,
  SuppressNotifications = 12,
  IsVoiceMessage = 13,
  HasSnapshot = 14
};

export enum RoleFlags {

};

export enum ChannelFlags {

};

export enum AttachmentFlags {

};