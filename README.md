<h1 align="center">ClearX</h1>
<br />

`ClearX` provides an alternative way to maintain application state and provides simple interface to bind state to UI components. It has utilities to set or get deep properties of a nested data using paths.

It works with React class components and Function UI components. UI components re-render automatically when bound data changes.

#### Installation:

```sh
$ npm install clearx --save
```

#### Usage:

There are two steps involved in using `ClearX`.

##### Create a data store:

First step in using Clearx is creating a store. `ClearX` uses paths to get and set deep properties of data so it doesn't enforce existence of all properties upfront. Which means, UI components can link to non-existing properties of the store. Initially they might receive undefined value, but they will be made available when the data at those paths is set. Let's take a look at an example

```javascript

import ClearX from `clearx`;

let store = new Clearx({
  user: {
    id: '',
    name: ''
  },
  todos: []
});

export default store;

```
Note that, the data can be a plain Object or a custom model long as it's properties can be accessed or changed using bracket notation  `data[property]`. Latest data is available to UI components whenever data is changed.

##### Bind data store to the UI components:

`ClearX` works with class components and function components. It can also be used as independent data observer.

###### Function component:

```javascript

import React, { Fragment } from 'react';
import store from './store';

const App = () => {

  let [ name ] = store.paths('user.name').link(useState());
  let [ todosCount, unlink ] = store.paths('todos.length').link(useState());

  useEffect(() => unlink, []);

  return (
    <Fragment>
      <span>Name: { name }</span>
      <span>Todos count: { todosCount }</span>
    </Fragment>
  );
}

export default App;

```

###### Class component:

```javascript

import React, { Fragment } from 'react';
import store from './store';

class App {
  constructor (props) {
    super(props)
    store.paths({
      name: 'user.name',
      todos: 'todos'
    }).link(this)
  }
  render () {
    const { name, todos } = this.state.store
    return (
      <Fragment>
        <div>name: { name }</div>
        <div>todos: { JSON.stringify(todos) } </div>
      <Fragment/>
    )
  }
}

export default App;

```
