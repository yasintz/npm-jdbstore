import _debounce from 'lodash.debounce';

import Queue from 'qqueue';

import {
  ISeriliazer,
  GetItemFn,
  SetItemFn,
  IStorage,
  Maybe,
  RemoItemFn,
} from './helpers';

class SuperStorage<T> implements IStorage<T> {
  private key: string;
  private cache: Maybe<string> = '';
  private queue = new Queue();

  constructor(
    key: string,
    private readonly initialValue: T,
    private readonly interval: number,
    private readonly getter: GetItemFn,
    private readonly setter: SetItemFn,
    private readonly remove: RemoItemFn,
    private readonly serializer: ISeriliazer<T>
  ) {
    this.key = `__${key.split(' ').join('_')}__`;
  }

  removeItem = async () => {
    await this.remove(this.key);
  };

  private parseItem = (value: Maybe<string>) => {
    if (!value) {
      return this.initialValue;
    }
    return this.serializer.parse(value);
  };

  getItem = () => {
    return this.queue.push(async () => {
      try {
        if (this.cache) {
          return this.parseItem(this.cache);
        }

        const item = await this.getter(this.key);

        this.cache = item;

        return this.parseItem(item);
      } catch (error) {
        return this.initialValue;
      }
    });
  };

  private _superSetter = _debounce(() => {
    if (this.cache) {
      this.setter(this.key, this.cache);
    }
  }, this.interval);

  setItem = async (value: T) => {
    const valueStr = await this.serializer.stringify(value);
    if (this.cache !== valueStr) {
      this.cache = valueStr;

      await this._superSetter();
    }
  };
}
export default SuperStorage;
