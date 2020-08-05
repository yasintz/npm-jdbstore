export interface IStorage<T> {
  getItem: () => Promise<T>;
  setItem: (item: T) => Promise<void>;
  removeItem: () => Promise<void>;
}

export type Maybe<T> = T | null;
export type RemoItemFn = (key: string) => Promise<void> | void;
export type GetItemFn = (key: string) => Promise<Maybe<string>> | Maybe<string>;
export type SetItemFn = (key: string, value: string) => void | Promise<void>;

export interface ISeriliazer<T> {
  parse: (str: string) => Promise<T> | T;
  stringify: (value: T) => Promise<string> | string;
}
