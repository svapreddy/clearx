<h1 align="center">ClearX</h1>
<br />

`ClearX` is an alternative way to Redux and MobX to maintain the application state and provides a simple interface to bind it to UI components. It has utilities to set or get deep properties of nested data using paths.

It works with React class components and Function UI components. UI components re-render automatically when bound data changes.

#### Installation:

```sh
$ npm install clearx --save
```

#### Version 1.x
For version 1.x please checkout [1.x Documentation](./README.1.x.md)

#### Usage:

There are two steps involved in using ClearX.

##### Create a datastore:

The first step in using Clearx is creating a store. `ClearX` uses paths to get and set deep properties of data, so it doesn't enforce the existence of all properties upfront. It means UI components can link to the non-existing properties of the store. Initially, they might receive undefined value, but they will be available to UI components when the data at those paths are updated. Let's take a look at an example:

```javascript

import ClearX from `clearx`;

let store = new ClearX({
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
Note that, the data can be a plain Object or a custom model long as it's properties can be accessed or changed using bracket notation  `data[property]`. The latest data is available to UI components whenever bound is changed.

##### Bind data store to the UI components:

`ClearX` works with class components and function components. It can also be used as an independent data observer.

Now let's bind the store to a function component. `ClearX` uses `useState()` hook to make the latest state available to the component. That means, whenever data at a path is updated, and any component is interested in data at that path, the setter of `useState()` is called with the updated data. Which internally triggers a re-render. Also, note that if data at a particular path is number `3` and the store's set method is called to update the value to 3. Because they are equal, ClearX does not cause the re-render, which is the same for any value. ClearX tries to avoid unnecessary re-renders.

In the below example, let's try to link some properties to the component.

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

In the above example, the component is bound to selected paths of the store. Change in any of those paths will trigger a re-render. And the unlink method is called when the component is unmounted. It will tear down all the data observers. Also, please note that useState() is required to remember the context of the function component. Without that, clearx will not be able to decide whether to reuse the already created data segment for the component or create a new one.

Now let's try to bind the data to a class component.

```jsx

import React, { Fragment, Component } from 'react';
import store from './store';

class App extends Component {
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

If you notice, unlinking is not required for class components. It is due to the availability of unmounting callback. We will learn more about the linking and unlinking in the API section.

<hr />

#### API:

`ClearX` has a familiar API. It provides some utilities to operate on the data and provides flexibility to bind data as per your application requirements.

##### new ClearX(Data, Options) (Class)

It's the class used to create the store. It's an entry point to use ClearX. It's a repetition, but please note that the data can be a plain Object or a custom model as long as it's properties can are accessible using bracket notation  `data[property]`. Latest data is available to UI components whenever data is changed. The example above pretty much covers how to create a Store using `ClearX`. Here is a basic syntax

```javascript
const store = new ClearX(data, {
  // Optional. default value is '.'. In case if you prefer using some other delimiter instead of "." please use this option.
  delimiter: '-',
  // enable redux devtools logging
  devtools: true, 
  // set redux devtools instance name.
  // defaults to document.title, or if document.title
  // is not defined: 'ClearX'
  name: 'Devtools ClearX Store Name' 
});
```

**Note**: _Below API is available on the instance of the ClearX class. We will be assuming the data provided in the above example._

##### `store.paths(path)`

`paths` is a critical piece of `ClearX`. This method lets you link data from the store to a component. When this method is called with paths satisfying the input format required, a new Data segment is created internally. This data segment allows to link to a UI component or observe changes or transform the data before it's supplied to the UI components. The data segment returned can be reused across components. Until at least one UI component is attached to a data segment, it does not listen for data changes unless we force it to do.

```javascript
 
const $identity = store.paths(['id', 'version']); // re-usable data segment

// Params to store.paths can be a path or array of paths or map of paths using aliases

// Link the data to a function component. Inside function component do like this.

const [ info, unlink ] = $identity.link( useState() ); // unlink() will remove links to all data segments from this component
console.log(info) // Notice info is returned in format paths are supplied. i.e ['Brave Browser', 'v0.68.140']

// Let's force it to observe data changes if you intend to use it for just observing data
$identity.sync(true);

// To turn off: 
$identity.sync(false);

// Listening for data changes

$identity.onUpdate((data) => { console.log('data changed: handler 1'); });
$identity.onUpdate((data) => { console.log('data changed: handler 2'); });

/* 
  It can be used for transforming the data before it's supplied to the UI components. These are applied in the sequence they are assigned.
  It's optional. But if you have a requirement of transforming the data before supplying to UI component, it would be handy.
*/

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

##### `store.bind(options)`

`bind` is created to aggregate multiple calls to `paths` function. Let's take a look at below example:

```javascript
const [info, unlink] = store.bind({
  paths: ['id', 'version'],
  to: useState()
  afterUpdate: (data) => { console.log('data is changed', data); },
  dataTransformer: (data) => { return data; },
});
```

##### `store.get(path)`

Returns the value at the provided path or undefined if the property at the path does not exist.

```javascript
const DevToolsEnabled = store.get('settings.DevTools');
console.log(DevToolsEnabled); // true

const ScreenshotEnabled = store.get('settings.Screenshot');
console.log(ScreenshotEnabled); // undefined

const someDeepProperty = store.get('a.b.c.d.e.3');
console.log(someDeepProperty); // undefined

const User2 = store.get('users.1');
console.log(User2); // { email: 'doe.john@test.com', name: 'Doe John', age: 50 }

```

##### `store.set(path, value, dontReplace)`

`set` can be used to assign the value at the provided path. If the path does not exist, it will create objects required to set the value on the path.
`dontReplace` would be handy if you have a requirement of updating a value if there no existing value.

```javascript

store.set('settings.Screenshot', true);
console.log(store.get('settings.Screenshot')); // true

store.set('a.b.c.d.e.0', ['test']);
console.log(store.get('a.b.c.d.e')) // ['test']
console.log(store.get('a.b.c.d.e.0')) // { a: { b: { c: { d: { e: ['test'] }}}}}

store.set('id', 'some-other-id', true);
console.log(store.get('version')) // Brave Browser. Because dontReplace make it set only if it does not exist

```

##### `store.empty(path)`

`empty` clears the value at the provided path. It is type aware. That means, if you call empty on an array, it will make it an empty array. 

```javascript

store.set('preferences.cookies', true)
store.empty('preferences.cookies')
console.log(store.get('preferences.cookies')) // false

console.log(store.get('users.0.age')) // 300
store.empty('users.0.age');
console.log(store.get('users.0.age')) // 0

store.set('openPages', ['https://www.google.com', 'https://www.github.com']);
store.empty('openPages');
console.log(store.get('openPages')) // []

store.set('prefs', { cookies: true, javascript: true });
store.empty('prefs');
console.log(store.get('prefs')) // {}

```

#### `store.coalesce(paths, defaultValue)`

Returns the first not undefined value from the provided array of paths

```javascript
const val = store.coalesce(['prop\\.does\\.not\\.exist', 'id']);
console.log(val); // Brave Browser

// Please note that delimiter (default '.') can be escaped using \\
const val2 = store.coalesce(['prop\\.does\\.not\\.exist', 'xyz'], 10);
console.log(val2) // 10. Returns provided default value

```

#### `store.insert(path, value, position)`

`insert` can be used to insert the value in the array at the given path and position. If the array does not exist at the path, this method will create one and adds the value.

```javascript
store.set('nums', [1, 2, 3]);

store.insert('nums', -1, 0)
console.log(store.get('nums')) // [-1, 1, 2, 3]

// If position is not provided, insert will act as push
store.insert('nums', -10)
console.log(store.get('nums')) // [-1, 1, 2, 3, -10]
```

#### `store.push(path, value1, value2 ...valueN)`

Push values to the end of the array at the given path. If the array does not exist at the path, this method will create one and push the value.

```javascript

store.push('nums', -1, 0)
console.log(store.get('nums')) // [-1, 1, 2, 3, -10, -1, 0]
```

#### `store.unshift(path, value1, value2 ...valueN)`

Insert values to the start of the array at the given path. If the array does not exist at the path, this method will create one and inserts the values.

```javascript

store.unshift('nums', 100)
console.log(store.get('nums')) // [100, -1, 1, 2, 3, -10, -1, 0]
```

#### `store.pop(path)`

`pop` is similar to the Array pop method. It removes the value from the end of the array at the given path.

```javascript
store.pop('nums')
store.pop('nums')
console.log(store.get('nums')) // [100, -1, 1, 2, 3, -10]
```

#### `store.shift(path)`

`store.shift` is similar to the Array shift method. It removes the value from the start of the array at the given path.

```javascript
store.shift('nums')
console.log(store.get('nums')) // [-1, 1, 2, 3, -10]
```

#### `store.splice(path, ...args)`
Similar to the Array splice method. Applies splice on the array at the given path using provided arguments.

```javascript
store.splice('nums', 2, 1) // A remove operation
console.log(store.get('nums')) // [-1, 1, 3, -10]

store.splice('nums', 2, 0, 100) // An insert operation
console.log(store.get('nums')) // [-1, 1, 100, 3, -10]
```

#### `store.slice(path, ...args)`
Similar to the Array slice method. Applies slice on the array at the given path using provided arguments and returns the value

```javascript
console.log(store.slice('nums', 0, 2)) // [-1, 1]
```

#### `store.sort(path, ...args)`

Similar to the Array sort method. Applies sort on the array at the given path using provided arguments.

```javascript

store.sort('nums', (a, b) => { return a - b; });
console.log(store.get('nums')) // [-10, -1, 1, 3, 100]

store.sort('nums', (a, b) => { return b - a; });
console.log(store.get('nums')) // [100, 3, 1, -1, -10]
```

#### `store.ensureExists(path, defaultValue)`
As its name suggests, it creates an entry on the provided path. If the value at the path does not exist, it will set the defaultValue on the path.

```javascript
console.log(store.get('some.prop')) // undefined
store.ensureExists('some.prop', 10)
console.log(store.get('some.prop')) // 10
```

#### `store.has(path)`
Checks whether an entry exists or not at the provided path.

```javascript
store.has('settings') // true
```

#### `store.delete(path)`

Deletes the entry at the given path

```javascript
store.delete('some.prop')
console.log(store.has('some.prop')) // false
console.log(store.has('some')) // true

store.unshift('nums', 1)
console.log(store.get('nums')) // [1, 100, 3, 1, -1, -10]
store.delete('nums.0')
console.log(store.get('nums')) // [100, 3, 1, -1, -10]
```
#### `store.merge(path, data)`

Merge the existing data at the given path with the provided data. It does not cause re-render is existing data, and provided data are the same.

```javascript
store.merge('settings', { syncBookmarks: true })
```

#### `store.increment(path, by = 1)`

It increments the value at the given path and by value. If the value at the path does not exist or not a number, it will assign `0` and then does the increment.

```javascript
store.increment('users.0.age')
console.log(store.get('users.0.age')) // 301
store.increment('users.0.age', 100)
console.log(store.get('users.0.age')) // 401
```

#### `store.decrement(path, by = 1)`

It decrements the value at the given path and by value. If the value at the path does not exist or not a number, it will assign `0` and then does the decrement.

```javascript
store.decrement('users.0.age')
console.log(store.get('users.0.age')) // 400
store.decrement('users.0.age', 100)
console.log(store.get('users.0.age')) // 300
```

#### `store.toggle(path)`

It toggles the boolean value at the given path. If the value at the path does not exist or not a number, it will assign `0` and then does the decrement.

```javascript
console.log(store.get('settings.Sync')) // true
store.toggle('settings.Sync')
console.log(store.get('settings.Sync')) // false
```

#### `store.isEqual(path, val)`

Checks if the value at the given path is equal to the provided value.

```javascript
console.log( store.isEqual('users.0.age', 300) ) // true
```

### Contributing:

Please check [guidelines](CONTRIBUTING.md) for more details.
