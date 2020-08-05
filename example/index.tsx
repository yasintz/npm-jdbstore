import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DatabaseStorage from '../.';

const YasinDatabaseStorage = DatabaseStorage.create('yasin-2', 1000);

const wordsStorage = new YasinDatabaseStorage<string[]>('words', []);

wordsStorage.getItem().then(vals => {
  wordsStorage.setItem([...vals, `${Math.random()}`]);
});
wordsStorage.getItem().then(vals => {
  wordsStorage.setItem([...vals, `${Math.random()}`]);
});
wordsStorage.getItem().then(vals => {
  wordsStorage.setItem([...vals, `${Math.random()}`]);
});
wordsStorage.getItem().then(vals => {
  wordsStorage.setItem([...vals, `${Math.random()}`]);
});
wordsStorage.getItem().then(vals => {
  wordsStorage.setItem([...vals, `${Math.random()}`]);
});
wordsStorage.getItem().then(vals => {
  wordsStorage.setItem([...vals, `${Math.random()}`]);
});
wordsStorage.getItem().then(vals => {
  wordsStorage.setItem([...vals, `${Math.random()}`]);
});

const App = () => {
  const [count, setCount] = React.useState(0);
  console.log(wordsStorage.use(), wordsStorage.getItem());

  return <div onClick={() => setCount(count + 1)}>hello {count}</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
