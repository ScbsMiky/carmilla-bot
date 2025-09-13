export type Optional<T extends Record<any, any>, K extends keyof T> = Omit<T, K> & DeepPartial<Pick<T, K>>;

export type NotOptional<T extends Record<any, any>, K extends keyof T> = Omit<DeepPartial<T>, K> & Pick<T, K>;

export type DeepPartial<T extends Record<any, any>> = {
  [K in keyof T]?: T[K] extends Object ? DeepPartial<T[K]> : T[K];
};