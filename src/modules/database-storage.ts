import React from 'react';
import SuperStorage from './storage';
import Axios from 'axios';

const databaseUrl = 'https://jsonn-database.herokuapp.com';

const databaseApi = Axios.create({ baseURL: databaseUrl });

class DatabaseStorage<T> extends SuperStorage<T> {
  constructor(user: string, interval: number, key: string, initialValue: T) {
    super(
      key,
      initialValue,
      interval,
      // getter
      (key: string) =>
        databaseApi.post(`/${user}`).then(({ data }) => data[key]),

      // setter
      (key: string, value: string) =>
        databaseApi
          .post(`/${user}`)
          .then(({ data }) => {
            data[key] = value;
            return data;
          })
          .then(json => databaseApi.put(`/${user}`, { db: json })),

      // remove
      (key: string) =>
        databaseApi
          .post(`/${user}`)
          .then(({ data }) => {
            data[key] = undefined;
            return data;
          })
          .then(json => databaseApi.put(`/${user}`, json)),

      { parse: JSON.parse, stringify: JSON.stringify }
    );
  }

  use() {
    const [storedValue, setStoredValue] = React.useState<T>();
    const setValue = React.useCallback(
      value => {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        this.setItem(valueToStore);
      },
      [storedValue]
    );

    React.useEffect(() => {
      (async () => {
        setStoredValue(await this.getItem());
      })();
    }, []);

    return [storedValue, setValue] as const;
  }
}

export default DatabaseStorage;
