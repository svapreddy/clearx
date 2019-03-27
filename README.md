<h1 align="center">ClearX</h1>
<div align="center"> Fast & Effortless state management for React with zero learning curve. </div>
<br />

## Table of Contents
- [Introduction](#introduction)
- [How ClearX works](#how-clearx-works)
- [Usage](#usage)
- [Todo example & Comparison](#example-todo-implementation-using-react-and-clearx)
- [Differences with MobX](#differences-with-mobx)
- [API](#api)
- [Compatibility](#compatibility)
 
#### Introduction: 

`ClearX` provides a painless way to manage the state for Frontend application. Check this [link](https://codesandbox.io/embed/v6ln04730?fontsize=14) for a basic Todo App demo or checkout Todo example section

###### Advantages:

- Insanely simple to use. Fast & small (3kb)
- Re-render UI components only when dependent data is changed in Store
- Store can be accessed, changed from anywhere in an application using very simple API
- Store is a plain reactive JS Object. ZERO learning curve! ClearX API is highly predictable and synchronous
- Works very well with dynamic properties
- Local state and global store can be used together. No restrictions
- No Boilerplate code. No need of declaring data consumers and providers through UI components. No need of Decorators
- No limit on number of stores. Store data is reversible & cloneable
- Makes it easy to work with 3rd party libraries that have no react flavor in them
- Helps to write tree-shaking friendly codebase.
- Helps effective seperation of concerns
- Developer and Code friendly alternative to Redux, React's Context API & MobX. Application code will never become complex due to State management
- Compatible with React, Preact, and Inferno without any configurational changes. Works with other UI libraries with minimal configuration

For example, This is how we can slice and attach a store to a UI component  

```javascript
Store.slice({
  fileOne: ['data', 'files', 'file1']
}, this)
```

###### How `ClearX` works:

Create a global application store with application's data structure. This can be accessed, changed, plugged and sliced from anywhere in an application. Now create slices from the application store and plug it anywhere in application. Each slice keeps itself in sync with the application store and updates the view or class with changes. If the slice is attached to a React component, it updates the state with the latest data from the application store which internally triggers the rerender process of UI component. All this happens with very simple API calls.

When we create an application store with `ClearX`, it provides a simple and rich API to operate on data. With API we can change the data, slice and plug the data anywhere in an application. Each slice keeps itself in sync with the application store and updates the view or class with changes. If the slice is attached to a React, Preact or Inferno UI component, it updates the state with the latest data from the application store which internally triggers the rerender process of UI component. When state changes in UI component, `ClearX` will NOT update the global application store. Instead it provides two choices. Update application store directly or use setState method of a slice which works exactly as React's setState method. When we update data on slice directly, the library internally checks what data has changed and other slices get updated only if there is a data change.

#### Usage:

##### Install:

```shell
npm install clearx --save
```

##### Creating a Store:

```javascript
import ClearX from `clearx`

// Plain JS Object which represents application data structure. All properties no need to be known at creation time
let ApplicationData = {
  user: {
    signedIn: false
  },
  test: 'one',
  data: {
    files: {
      file1: {
        name: 'my file1.txt'
      }
    }
  },
  a: {
    b: "d",
    c: ["e", "f"]
  }
}

// Create clearx instance with the data
let appStore = new ClearX(ApplicationData)

export default appStore

```

##### Slicing and Attaching the application store to a UI Component

```javascript
import React, { Component } from 'react'

// Import application store
import appStore from './src/storeFile.js'

// It can be a class or function. ClearX works with all.
class MyView extends Component {
  constructor (props) {
    super(props)
    // UI Component can have a local state.
    this.state = {
      localState1: 'test'
    }
    
    // Now, lets access fileOne from appStore and attach to the UI component. Below is all we need to do
    // Note 1: ClearX uses array pattern to to play safe with special characters like `.`. ['data', 'files', 'file1'] is equal to `data.files.file1`
    // Note 2: Non existent keys can be used. But data will be available when the data at the location is created and available.
    // Note 3: slice will be destroyed automatically with UI component
    
    appStore.slice({
      fileOne: ['data', 'files', 'file1']
    }, this)
    
    // The slice method above will make the data is available inside state Object's store property
    console.log(this.state.store)
  }
  render () {
    // Note: Always `this.state.store`
    let { fileOne } = this.state.store
    return (
      <div>{fileOne.name}</div>
    )
  }
}

```

##### Slicing and attaching the application store to a class which is not a UI component

```javascript
import appStore from './src/storeFile.js'

class Account {
  constructor () {
    this.sliced = appStore.slice({
      signedIn: ['user', 'signedIn']
    }, this, {
      // Events can be listened using `updateCallback` option. Example usecase: Fetch initial data when user is signedIn.
      updateCallback: this.checkData.bind(this)
    })
    // If not react component, the location for sliced data is `this.store`
    console.log(this.store)
  }
  checkData () {
    if (this.store.signedIn) {
      // Fetch some initial data
    }
  }
  destroy () {
    // Note: Slice below is not destroyed automatically. We need to call .destroy() on a slice to destroy manually.
    this.sliced.destroy()
  }
}

export default Account
```

##### Slicing and attaching the application store to a plain JavaScript Object

```javascript
import appStore from './src/storeFile.js'

let data = {}

appStore.slice({
  fileTwo: ['data', 'files', 'file2']
}, data, {
  updateCallback: checkData
})

let checkData = () => {
   // If not react component, the location is `this.store`
   if (data.store.signedIn) {
     // Fetch some initial data
   }
}

```

##### Accessing & updating the application store without using slice.

```javascript
// Import appStore from file.
import appStore from './src/storeFile.js'

class MyCls {
  constructor () {
    this.updateData()
  }
  updateData () {
    appStore.set(["a", "b"], "test")
    this.checkData()
  }
  checkData () {
    appStore.get(["a", "b"]) // Will be equal to "test"
  }
}

export default MyCls
```

##### Revert data example

For example, we are doing some server operation and would like to revert data if server call fails. Do it in this way:

```javascript
import appStore from './src/storeFile.js'

class MyCls {
  constructor () {
    this.sliceInstance = appStore.slice({
      fileTwo_Name: ['data', 'files', 'file2', 'name']
    }, this)
    this.postName()
  }
  checkData () {
    let instance = this.sliceInstance
    let old = instance.clone
    instance.slice = {
      fileTwo_Name: 'new name.txt'
    }
    makeSomeCall().then(() => {
      // all good
    }, () => {
      // ClearX will internally check for changes and updates other slices if there are any changes.
      instance.slice = old
    })
  }
}

export default MyCls
```

### Example Todo implementation using React and ClearX

Please run:  

```sh
  $ npm install
  $ npm install -g rollup
  $ npm run todo 
```

Now go to http://localhost:8719/ to access todo application. Source is available under `./example` folder.

Compare the code with [Redux version of Todo](https://redux.js.org/basics/example) and [MobX version of Todo](https://github.com/mobxjs/mobx-react-todomvc)

### Differences with MobX

While MobX is providing similar functionality using different syntax and has much larger scope. ClearX focus is on providing a barebones reactive store that does the Job using simple API. 

Here are few differences:  

- All the existing and dynamic data in store is observable by the default. No need to explicitly make any property observable. ClearX operates on plain JS Object
- ClearX does not depend on creating setters on properties to watch data changes. Using them on large number of properties has some performance penalty in performance critical applications
- ClearX has zero learning curve.
- The application code that used ClearX remains same even after transpilation. No extra code code overhead
- ClearX has very minimal API. Chances of running into a problem are very little
- ClearX has no browser specific limitations. It works in all the modern browsers and consistently fast across the browsers
- All the data changes to Store happens through proxy like API. There are almost no cases where the data is updated and ClearX is unable to catch them and update the UI
- ClearX size is 3KB. MobX size is around 14KB

Although optional in MobX,  
- ClearX uses slice over Static properties in MobX. Using Static properties adds more code overhead during transpilation.
- ClearX does not use Decorators. Using Decorators adds more code overhead during transpilation.

### API:

The ClearX instance contains below API:

#### <code>slice</code>:  
Get a slice of data from the application store  
*`map:`*   
A map to application store data with keys we are interested in. Look at the example above for the format. The path must be an array of keys. In above example ['data', 'files', 'file1'] is equal to `data.files.file1` but ClearX promotes array format to avoid conflicting with `.` in keys in data.

*`context:`*   
The instance where the returned slice is bound to. It can be React component or a plain class. slice internally checks if it is a react component and flows the data from the root store to component's state. The data will be available on `this.state.store`. If the context is a plain class, the data is synced to `this.store`. `store` is the namespace that slice uses. The context can be a preact or inferno component. slice looks for `setState` and `render` methods OR isReactComponent key on context to determine if it is a react like component. This makes compatible slice compatible with Preact and Inferno.

*`config:`*   
The config can contain, `defaults` object, `updateCallback` function, `reactLike` boolean value. defaults is for setting the default data into the root store on initializing. For example, if we have a React component/plain class that receives router params and that need to be set to the root store, we can use defaults. defaults example is `{fileOne: 'my default filename.txt'}`. In this example, slice looks for `fileOne` key in map and updates that location. `updateCallback` is used to know when data is updated in local store slice. For React component, it is not much use as render method is already called, but for plain classes, we can use this to listen for the data changes and do some operations. Lastly `reactLike` can be provided. Even not provided, `slice` internally checks if it's react like component.
  
```javascript
// we do not need to store the sliceInstance if we don't have to call any methods on slice instance
let sliceInstance = appStore.slice(/* map */{
  fileOne: ['data', 'files', 'file1']
}, /* context */ this, /* config */ {
  defaults: {
    // keys of data should match the map keys. Otherwise ignored.
    fileOne: 'my default filename.txt'
  },
  updateCallback: {}
})
// sliceInstance.setState, calls component's setState internally if available and also updates application store
// sliceInstance.slice for the store data
// sliceInstance.destroy to destroy the slice
// sliceInstance.slice = data, internally compares and updates the values directly in application store. Has the same effect as above setState above. Useful from plain classes. But keys of data should match the map keys. Otherwise ignored.
// let old = sliceInstance.clone, clones the slice data. When we are making some AJAX call, if the call has failed, we can assign old value back to slice instance with `sliceInstance.slice = old`. Library internally checks which data is changed and updates other slices accordingly.
```

#### <code>destroy</code>:   
Destroy the store. 
```javascript
appStore.destroy()
```

#### <code>localStores</code>:   
Get list of slices initialized. 
```javascript
appStore.localStores
```

#### <code>data</code>:   
Get the root store data. 
```javascript
appStore.data
```

> Remaining APIs below are adopted from [object-path](https://www.npmjs.com/package/object-path). It is an excellent library for operating on data. We can also check the documentation at this location. Except that we will not pass the data and key paths are always in key format. Methods from `object-path` are wrapped and exposed through store instance to trigger root store updates on data changes. `merge` method uses [deepmerge](https://www.npmjs.com/package/deepmerge)

#### <code>get</code>:   

Get deep property from root store. Takes key path as an input. 
```javascript

// Provide key to look for.
appStore.get(["data", "files", "fileOne"])

// works also with arrays
appStore.get(["a", "c", "1"])

// Can return a default value with get. Note: Does not update the root store with default value
appStore.get(["a", "c", "b"], "DEFAULT");  // returns "DEFAULT", since ["a", "c", "b"] path doesn't exists, if omitted, returns undefined
```

#### <code>set</code>:  
Set a value at given path. Triggers root store updates if new value is different from old value.

```javascript
appStore.set(["a", "h"], "m")
appStore.get(["a", "h"]);  //returns "m"
// set will create intermediate object/arrays
appStore.set(["a", "j", 0, "f"], "m")
```

#### <code>empty</code>:  
empty a given path (but do not delete it) depending on their type, so it retains a reference to objects and arrays.
functions that are not inherited from prototype are set to null. object instances are considered objects and just own property names are deleted. Triggers root store updates

```javascript
appStore.empty(['a', 'b']); // ['a', 'b'] is now ''
appStore.empty(['a', 'c']); // ['a', 'c'] is now []
appStore.empty(['a']); // ['a'] is now {}
```

#### <code>del</code>:  
Deletes a path. Also, Works on arrays. Triggers root store updates

```javascript
appStore.del(["a", "b"]) // Root store value at ["a", "b"] is now undefined
appStore.del(["a", "c", 0]) // Root store value at ["a", "c"]is now ['f']
```

#### <code>insert</code>:  
Insert values in array. Triggers root store updates

```javascript
appStore.insert(["a", "c"], "m", 1); // Data at ["a", "c"] will be ["e", "m", "f"]
```
 
#### <code>push</code>:  
Push into arrays (and create intermediate objects/arrays). Triggers root store updates

```javascript
appStore.push(["a", "k"], "o")
```

#### <code>ensureExists</code>:  
Ensure a path exists (if it doesn't, set the default value we provide). Triggers root store updates

```javascript
appStore.ensureExists(["a", "k", "1"], "DEFAULT")
let oldVal = appStore.ensureExists(["a", "b"], "DEFAULT") // oldval === "d"
```

#### <code>has</code>:  
Tests path existence

```javascript
appStore.has(["a", "b"]) // true
appStore.has(["a", "d"]) // false
```

#### <code>merge</code>
Merges the data key with new data. Uses [deepmerge](https://www.npmjs.com/package/deepmerge) library. We can pass in same options

```javascript
appStore.merge(["a", "b"], {key: value}, {})
```

#### <code>coalesce</code>:  
Get the first non-undefined value from list of keys provided.  

```javascript
appStore.coalesce(obj, [ ["data", "files", "fileOne"], ["data", "files", "fileTwo"]], {name: 'default filename.txt'})
```

### Compatibility:
During development `ClearX` was tested with React and plain classes. `ClearX` will work with libraries like Preact, Inferno with no extra configuration considering they provide `setState` method and `componentWillUnmount` hook. To use ClearX with other UI libraries, please add a `setState` function on component to receive the updated data. Also call `destroy()` method before UI component is unmounted.

### Contributing:

Please check [guidelines](CONTRIBUTING.md) for more details.
