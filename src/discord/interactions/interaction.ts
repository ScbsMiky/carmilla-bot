import type { ChannelType, Member, Message } from "../types/types";

export interface Interaction {
  id: string;
  token: string;
  locale: string;
  guild_id: string;
  channel_id: string;
  application_id: string;
  app_permissions: string;
  
  type: number;
  version: number;
  context: number;
  attachment_size_limit: number
  
  member: Member;
  message: Message;
  channel: MessageChannel;

  data: any;

  guild: { locale: string; id: string; features: string[ ]; };
  authorizing_integration_owners: Record<string, string>;

  entitlements: any[ ];
  entitlement_sku_ids: string[ ];
};

export enum TextStyle {
  Short = 1,
  Paragraph = 2
};

export enum ButtonStyle {
  Primary = 1,
  Secondary = 2,

  Link = 5,
  Danger = 4,
  Success = 3,
  Premium = 6
};

export enum ComponentType {
  File = 13,
  Label = 18,
  Button = 2,
  Section = 9,
  Thumbnail = 11,
  TextInput = 4,
  ActionRow = 1,
  Separator = 14,
  Container = 17,
  UserSelect = 5,
  RoleSelect = 6,
  TextDisplay = 10,
  StringSelect = 3,
  MediaGallery = 12,
  ChannelSelect = 8,
  MentionableSelect = 7,
};

export type ActionRowComponents = 
    ButtonStructure
  | UserSelectStructure
  | RoleSelectStructure
  | StringSelectStructure
  | ChannelSelectStructure
  | MentionableSelectStructure;

export type ContainerComponents =
    FileStructure
  | SectionStructure
  | ActionRowStructure
  | SeparatorStructure
  | TextDisplayStructure
  | MediaGalleryStructure;

export type Component =
    FileStructure
  | LabelStructure
  | ButtonStructure
  | SectionStructure
  | ThumbnailStructure
  | TextInputStructure
  | ActionRowStructure
  | SeparatorStructure
  | ContainerStructure
  | UserSelectStructure
  | RoleSelectStructure
  | TextDisplayStructure
  | StringSelectStructure
  | MediaGalleryStructure
  | ChannelSelectStructure
  | MentionableSelectStructure;

export interface UnfurledMedia {
  url: string;
  
  width?: number;
  height?: number;

  proxy_url?: string;
  content_type?: string;
  attachment_id?: string;
};

export interface SelectDefaultValue {
  id: string;
  type: "user" | "role" | "channel";
};

export interface BaseComponentStructure<T extends ComponentType> {
  type: T;
  custom_id: string;

  id?: number;

  disabled?: boolean;
};

export interface FileStructure extends Omit<BaseComponentStructure<ComponentType.File>, "custom_id" | "disabled"> {
  name: string;
  
  size: number;

  file: UnfurledMedia;

  spoiler?: boolean;
};

export interface ButtonStructure extends BaseComponentStructure<ComponentType.Button> {
  url?: string;
  label?: string;
  emoji?: string;
  sku_id?: string;

  style?: ButtonStyle; 
};

export interface StringSelectStructure extends BaseComponentStructure<ComponentType.StringSelect> {
  options: {
    label: string;
    value: string;

    default?: boolean;
    description?: string;

    emoji?: {
      id?: string;
      name?: string;
      animated?: boolean;
    }
  }[ ];

  min_values?: number;
  max_values?: number;

  placeholder?: string;

  required?: boolean;
};

export interface LabelStructure {
  type: ComponentType.Label;
  component: StringSelectStructure | TextInputStructure;
  
  id?: number;
  
  label?: string;
  description?: string;
};

export interface SectionStructure {
  type: ComponentType.Section;
  component: (TextDisplayStructure)[ ];
  accessory: (ButtonStructure | ThumbnailStructure);

  id?: number;
};

export interface ThumbnailStructure {
  type: ComponentType.Label;
  
  media: UnfurledMedia;

  id?: number;

  spoiled?: boolean;
};

export interface TextInputStructure extends BaseComponentStructure<ComponentType.TextInput> {
  style: TextStyle;

  value?: string;
  placeholder?: string;

  min_length?: number;
  max_length?: number;
};

export interface ActionRowStructure {
  id?: string;
  type: ComponentType.ActionRow;
  components: ActionRowComponents[ ];
};

export interface SeparatorStructure {
  type: ComponentType.Separator;

  id?: number;
  spacing?: 1 | 2;

  divider?: boolean;
};

export interface ContainerStructure {
  type: ComponentType.Container;
  components: ContainerComponents[ ];

  id?: number;
  accent_color?: number;

  spoiler?: boolean;
};

export interface UserSelectStructure extends BaseComponentStructure<ComponentType.UserSelect> {
  placeholder?: string;
  
  min_values?: number;
  max_values?: number;
  
  required?: boolean;

  default_values: SelectDefaultValue[ ];
};

export interface RoleSelectStructure extends BaseComponentStructure<ComponentType.RoleSelect> {
  placeholder?: string;

  max_values?: number;
  min_values?: number;

  required?: boolean;

  default_values?: SelectDefaultValue[ ];
};

export interface TextDisplayStructure {
  type: ComponentType.TextDisplay;
  
  content: string;

  id?: number;
};

export interface MediaGalleryStructure {
  type: ComponentType.MediaGallery;

  items: {
    media: UnfurledMedia;

    description?: string;

    spoiler?: boolean;
  }[ ];

  id?: number;
};

export interface ChannelSelectStructure extends BaseComponentStructure<ComponentType.ChannelSelect> {
  channel_types?: ChannelType[ ];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  required?: boolean;
};

export interface MentionableSelectStructure extends BaseComponentStructure<ComponentType.MentionableSelect> {
  default_values: SelectDefaultValue[ ];

  placeholder?: string;
  
  min_values?: number;
  max_values?: number;

  required?: boolean;
};