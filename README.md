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

First step in using Clearx is creating a store. `ClearX` uses paths to get and set deep properties of data so it doesn't enforce existence of all properties upfront. Which means, UI components can link to non-existing properties of the store. Initially they might receive undefined value, but they will be made available when the data at those paths is set. Let's take a look at an example:

```javascript

import ClearX from `clearx`;

let store = new Clearx({
  id: 'Brave Browser',
  version: 'v0.68.140',
  settings: {
    File: true,
    Edit: true,
    History: true,
    Bookmarks: true,
    Window: true,
    Help: true,
    DevTools: true
  },
  openTabs: 3,
  users: [{
    email: 'john.doe@test.com',
    name: 'John Doe',
    age: 300
  }, {
    email: 'doe.john@test.com',
    name: 'Doe John',
    age: 50
  }]
});

export default store;

```
Note that, the data can be a plain Object or a custom model long as it's properties can be accessed or changed using bracket notation  `data[property]`. Latest data is available to UI components whenever data is changed.

##### Bind data store to the UI components:

`ClearX` works with class components and function components. It can also be used as independent data observer.

Now let's bind the store to a function component. `ClearX` uses `useState()` hook to make latest state available to component. That means, whenever data at a path is updated, if the component is interested in data at that path, the setter of `useState()` is called with latest state. Which internally triggers a re-render. Also note that, if data at particular path is number `3` and store's set method is called to update the value to 3. Because they are equal ClearX does not cause the re-render. Which is same for any type of value. ClearX tries to avoid unnecessary re-renders.

In below example lets try to link some properties to the component

```jsx

import React, { Fragment } from 'react';
import store from './store';

const App = () => {

  let [ identity ] = store.paths(['id', 'version']).link(useState());
  let [ usersCount ] = store.paths('users.length').link(useState());
  let [ openTabs ] = store.paths('openTabs').link(useState());
  let [ settings, unlink ] = store.paths({
    devTools: 'settings.DevTools',
    history: 'settings.History'
  }).link(useState());

  useEffect(() => unlink, []);

  return (
    <code>
      Id: { identity[0] }
      Version: { identity[0] }
      openTabs: { openTabs }
      UsersCount: { usersCount }
      DevToolsEnabled: { settings.devTools }
      HistoryEnabled: { settings.history }
    </code>
  );
}

export default App;

```

In above example, component is bound to selected paths of the store. Change in any of those paths will trigger a re-render. And unlink method is called when component is unmounted. It will teardown all the data observers.

Now let's try to bind the data to a class component.

```jsx

import React, { Fragment } from 'react';
import store from './store';

class App {
  constructor (props) {
    super(props)
    
    store.paths({
      Id: 'id'
      Version: 'version'
      openTabs: 'openTabs'
      UsersCount: 'users.length'
      DevToolsEnabled: 'settings.DevTools'
      HistoryEnabled: 'settings.History'
    }).link(this)
    
  }
  render () {
    const { Id, Version, openTabs, UsersCount, DevToolsEnabled, HistoryEnabled } = this.state.store
    return (
      <code>
        Id: { Id }
        Version: { Version }
        openTabs: { openTabs }
        UsersCount: { UsersCount }
        DevToolsEnabled: { DevToolsEnabled }
        HistoryEnabled: { HistoryEnabled }
      </code>
    )
  }
}

export default App;

```

If you notice, unlinking is not required for class components. It is due to the availability of unmount callback. We will learn more about the linking and unlinking in API section.

<hr />

#### API:

`ClearX` has familiar API. It provides some utilities to operate on the data and provides flexibility to bind data as per your application requirements.

##### ClearX(Data, Options) (Class)

Input: _Data, whose properties can be accessed using bracket notation. Options, if you want to use custom delimiter other than `.`_

It's a class used to create store. It's an entry point to use ClearX. It's a repetition but please note that, the data can be a plain Object or a custom model as long as it's properties can are accessible using bracket notation  `data[property]`. Latest data is available to UI components whenever data is changed. The example above pretty much covers how to create a Store using `ClearX`. Here is a basic syntax

```javascript
const store = new ClearX(data, {
  delimiter: '-' // default value '.'
});
```

**Note**: _Below API is available on the instance of the ClearX class. We will be assuming data provided in above example._

##### ClearX.paths (Function)

Input: _Array of paths or path or map of paths using aliases_

This is a critical peice of `ClearX`. This method let's you link data from store to a component. When this method is called with paths satisfying the input format required, a new Data segment is created internally. This data segment allows to link to a ui component or observe changes or transform the data before it's supplied to the ui components. The data segment returned can be re-used across components. Until atleast one UI component is attached to a data segment it does not listen for data changes unless we force it to do.

```javascript
 
const $identity = store.paths(['id', 'version']); // re-usable data segment

// Link the data to a function component. Inside function component do like this

const [ info, unlink ] = $identity.link( useState() ); // unlink() will remove links to all data segments from this component
console.log(info) // Notice info is returned in format paths are supplied. i.e ['Brave Browser', 'v0.68.140']

// Let's force it to observe data changes if you intend to use it for just observing data
$identity.sync(true);

// To turn off: 
$identity.sync(false);

// Listening for data changes

$identity.onUpdate((data) => { console.log('data changed: handler 1'); });
$identity.onUpdate((data) => { console.log('data changed: handler 2'); });

// Transforming the data before it's supplied to the UI components. These are applied in sequence they are assigned

$identity.dataTransformer((data) => {
  return {
    id: data[0],
    version: data[1]
  };
});

$identity.dataTransformer((data) => {
  return {
    Id: data.id,
    Version: data.version
  };
});

// Finally teardown.
$identity.teardown();
  
```

##### ClearX.bind (Function)

Input: _Options, paths, to, afterUpdate, dataTransformer_

bind is created to aggregate multiple calls to `paths` function. Let's take a look at below example:

```javascript
const [info, unlink] = store.bind({
  paths: ['id', 'version'],
  to: useState()
  afterUpdate: (data) => { console.log('data is changed', data); },
  dataTransformer: (data) => { return data; },
});
```

##### ClearX.get (Function)
Input: _Path_

Returns the value at the path. Returns undefined if property at the path does not exist.

```javascript
const DevToolsEnabled = store.get('settings.DevTools');
console.log(DevToolsEnabled); // true

const ScreenshotEnabled = store.get('settings.Screenshot');
console.log(ScreenshotEnabled); // undefined

const User2 = store.get('users.1');
console.log(User2); // { email: 'doe.john@test.com', name: 'Doe John', age: 50 }

```


