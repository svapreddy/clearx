<span style="color:red">test</span>
<h1 align="center">ClearX</h1>
<div align="center"> Simple state management for React. </div>

<br />

`ClearX` provides an alternative way to maintain application state and provides simple interface to bind state to UI components. It has utilities to set or get deep properties of a nested data.

Advantages:

- Cleax is fast and small. Usage is very simple.
- Automatically triggers the UI Component's re-render process only when depending data change.
- Provides rich set of API to operate on data.
- Properties can be accessed before they are created.
- Works with Class components, Functional Components and plain objects.

#### Usage:

##### Install:

```shell
npm install clearx --save
```

##### Creating a Store:

```javascript

/* -------- Create store -------- */

// step 1: import the clearx library
import ClearX from `clearx`
// step 2: create store with the default data
let store = new Clearx({
  name: 'Clearx Library',
  age: 1,
  tags: ['global-store', 'global-state', 'react'],
  worksWith: {
    react: true,
    preact: true,
    inferno: true
  }
})
// step 3: export
export default store

/* -------- Create observable data segments -------- */

// Note: properties can be non-existent. Segments are updated automatically when they are created.

// A single path can be provided
const name = store.paths('name')
console.log(name.data) // Clearx Library

const supportReact = store.paths('worksWith.react')
console.log(supportReact.data) // true

// Array of paths can be provided
const basicInfo = store.paths(['name', 'age']) 
console.log(basicInfo.data) // ['Clearx Library', 1]

// Or a map of aliases and paths can be provided
const info = store.paths({
  inferno: 'worksWith.inferno',
  age: 'age',
  firstTag: 'tags.0'
})
console.log(info.data) // { age: 1, inferno: true, firstTag: 'global-store' }

/* -------- Bind observable data segments to UI -------- */

// Functional component

const App = () => {
  
  // a ui component can bound to multiple data segments
  let [ information ] = info.link(useState())
  let [ supportsReact, unlinkAll ] = supportReact.link(useState())

  useEffect(() => unlinkAll, [])

  return (
    <>
      <div>supports react: {supportsReact}></div>
      <div>age: {information.age}</div>
      <div>supports inferno: {information.inferno}</div>
      <div>firstTag: {information.firstTag}</div>
    </>
  )
}

// Class component

class App {
  constructor (props) {
    super(props)
    info.link(this)
    console.log(this.state.store) // { age: 1, inferno: true, firstTag: 'global-store' }
  }
  render () {
    const { store } = this.state
    return (
      <>
        <div>age: {store.age}</div>
        <div>supports inferno: {store.inferno}</div>
        <div>firstTag: {store.firstTag}</div>
      </>
    )
  }
}

```

##### Slicing and attaching the data store to a plain JavaScript Object

```javascript
import appStore from './src/storeFile.js'

let data = {}

appStore.bind({
  paths: {
    fileTwo: ['data', 'files', 'file2']
  },
  to: this,
  events: {
    afterUpdate: checkData
  }
})

let checkData = () => {
   // If not react component, the location is `this.store`
   if (data.store.signedIn) {
     // Fetch some initial data
   }
}

```

### API:

The ClearX instance has below API:

#### <code>bind</code>:  
Get a slice of data from the store & attach.

```javascript
let sliceInstance = appStore.bind({
  // Key map
  paths: {
    fileOne: ['data', 'files', 'file1']
  },
  // Context
  to: this,
  // Default data to set in data store
  withDefaultData: {
    fileOne: 'my default filename.txt'
  },
  // Optional events
  events: {
    afterUpdate: function(data) {
      console.log('After store data is updated: ', data)
    }
  },
  // Optional. Automatically detected for React like components
  isReactFamilyUIComponent: true
})
console.log(sliceInstance.slice) // Data slice
sliceInstance.destroy() // Destroy slice
console.log(sliceInstance.clone) // Data slice clone
sliceInstance.slice = {} // Compares and replace the data in data store
```

#### <code>slice (obsolete. Use bind)</code>:  
Get a slice of data from the store & attach
*`map:`*   
Keys map. The path must be an array of keys. In above example ['data', 'files', 'file1'] is equal to `data.files.file1` but ClearX promotes array format to avoid conflicting with `.` in keys in data.

*`context:`*   
The instance where the returned slice is bound to.

*`config:`*   
Optional config can contain, `defaults` object, `updateCallback` function, `reactLike` boolean value.
  
```javascript
// we do not need to store the sliceInstance if we don't have to call any methods on slice instance
let sliceInstance = appStore.slice(
  /* Keys map */
  {
    fileOne: ['data', 'files', 'file1']
  }, 
  /* context */ 
  this, 
  /* config */ 
  {
      // Default data to set in data store
      defaults: {
        fileOne: 'my default filename.txt'
      },
      // After data update event.
      updateCallback: {}
  }
)

console.log(sliceInstance.slice) // Data slice
sliceInstance.destroy() // Destroy slice
console.log(sliceInstance.clone) // Data slice clone
sliceInstance.slice = {} // Compares and replace the data in data store
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

> Remaining APIs below are adapted from [object-path](https://www.npmjs.com/package/object-path). It is an excellent library for operating on data. We can also check the documentation at this location. Except that we will not pass the data and key paths are always in key format. Methods from `object-path` are wrapped and exposed through store instance to trigger root store updates on data changes. `merge` method uses [deepmerge](https://www.npmjs.com/package/deepmerge)

#### <code>get</code>:   

Get deep property from root store. Takes key path as an input. 
```javascript

// Provide key to look for.
appStore.get(["data", "files", "fileOne"])

// works also with arrays
appStore.get(["a", "c", "1"])

// Can return a default value with get. Note: Does not update the root store with default value
appStore.get(["a", "c", "b"], "DEFAULT")  // returns "DEFAULT", since ["a", "c", "b"] path doesn't exists, if omitted, returns undefined
```

#### <code>set</code>:  
Set a value at given path. Triggers root store updates if new value is different from old value.

```javascript
appStore.set(["a", "h"], "m")
appStore.get(["a", "h"])  //returns "m"
// set will create intermediate object/arrays
appStore.set(["a", "j", 0, "f"], "m")
```

#### <code>empty</code>:  
empty a given path (but do not delete it) depending on their type, so it retains a reference to objects and arrays.
functions that are not inherited from the prototype are set to null. object instances are considered objects and just own property names are deleted. Triggers root store updates

```javascript
appStore.empty(['a', 'b']) // ['a', 'b'] is now ''
appStore.empty(['a', 'c']) // ['a', 'c'] is now []
appStore.empty(['a']) // ['a'] is now {}
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
appStore.insert(["a", "c"], "m", 1) // Data at ["a", "c"] will be ["e", "m", "f"]
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
During development `ClearX` was tested with React and plain classes. `ClearX` will work with libraries like Preact, Inferno with no extra configuration considering they provide `setState` method and `componentWillUnmount` hook. To use ClearX with other UI libraries, please add a `setState` function on the component to receive the updated data. Also, call `destroy()` method before the UI component is unmounted.

### Contributing:

Please check [guidelines](CONTRIBUTING.md) for more details.
