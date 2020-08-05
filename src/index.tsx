import BaseDatabaseStorage from './modules/database-storage';

declare class DatabaseStorageClass<T> extends BaseDatabaseStorage<T> {
  constructor(key: string, initialValue: T);
}

type DatabaseStorageType = typeof DatabaseStorageClass;

function createInstance(user: string, interval: number) {
  return class DatabaseStorage<T> extends BaseDatabaseStorage<T> {
    constructor(key: string, initialValue: T) {
      super(user, interval, key, initialValue);
    }
  };
}

const DatabaseStorage: typeof BaseDatabaseStorage & {
  create: (user: string, interval: number) => DatabaseStorageType;
} = Object.assign(BaseDatabaseStorage, { create: createInstance });

export default DatabaseStorage;
