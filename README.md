<h1 align="center">ClearX</h1>
<div align="center"> Fast & Effortless global state management for React, Preact and Inferno with zero learning curve. </div>
<br />

## Table of Contents
- [Introduction](#introduction)
- [How ClearX works](#how-clearx-works)
- [Philosophy](#philosophy)
- [Usage](#usage)
- [Todo example & Comparison](#example-todo-implementation-using-react-and-clearx)
- [API](#api)
- [Compatibility](#compatibility)
 
#### Introduction: 

`ClearX` provides an alternative & very simple way to manage the global state for the Frontend application. Check this [link](https://codesandbox.io/embed/v6ln04730?fontsize=14) for a basic Todo App demo or check out Todo example section

###### Advantages:

- Insanely simple to use. Fast & small (3kb)
- Re-renders UI components only when dependent data is changed in Store
- The store can be accessed, changed from anywhere in an application using an expressive API
- The store is a plain reactive JS Object. ClearX API is highly predictable and synchronous.
- No limitations for adding new properties to the existing store after creation
- Local state and global store can be used together. No restrictions
- No Boilerplate code. No need for declaring data consumers and providers through UI components. No need of Decorators
- No limit on the number of stores. Store data is reversible & cloneable
- Makes it easy to work with 3rd party libraries that have no react flavour in them
- Helps to write tree-shaking friendly codebase.
- Helps effective separation of concerns
- Developer and Code friendly alternative Global State Management. 
- Simple. Avoids complexity around state management
- Compatible with React, Preact, and Inferno without any configurational changes.

It's this simple:

```javascript
Store.bind({
  paths: {
    fileOne: ['file', 'one']
  },
  to: this
})
```

Note: Earlier versions used `slice` method. It will work without any problem. But the bind method is recommended. For usage of slice method please check tests.

###### How `ClearX` works:

The initial step in ClearX is creating an application data structure and creating a ClearX data store instance. Data attached to this instance can be accessed & modified from anywhere in the application including UI components that share React UI component structure.

ClearX provides a way to slice parts of data from the store and use it. This slice can be plugged to UI components. The slice keeps itself in sync with the latest data from the data store. When data is changed, the slice will trigger the UI component's re-render process and calls the afterUpdate callback.

Data store provides an expressive API to modify the data in the store.

###### Philosophy:

UI represents complex business-related operations of an application using a visual layer. UI layer often goes through a lot of iterations and sometimes requires to refactor in an Agile development environment. Also, the JavaScript community is active in adopting new standards, having the flexibility to refactor UI layer without impacting underlying application architecture helps to maintain large codebase in the long run. Often application architecture is highly influenced by the application needs. ClearX is an attempt is to help in this process. 

Global State Management is the spine part of an application & deserve to be simple for the long run. If we keep it simple to understand for Developers, it helps to maintain the application performance and quality of the application. ClearX attempt to help in this area by utilizing plain JavaScript concepts.

Transpilation is used heavily in Frontend development, which often results in huge amounts of code. ClearX attempt to help in this context. The [idle-until-urgent](https://philipwalton.com/articles/idle-until-urgent/) also influenced parts of ClearX decision making process.

#### Usage:

##### Install:

```shell
npm install clearx --save
```

##### Creating a Store:

```javascript
import ClearX from `clearx`

// Application data structure.
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

##### Slicing and Attaching the data store to a UI Component

```javascript
import React, { Component } from 'react'

// Import application store
import appStore from './src/storeFile.js'

// It can be a class or a function. ClearX works with all.
class MyView extends Component {
  constructor (props) {
    super(props)
    // UI Component can have a local state. Optional step!
    this.state = {
      localState1: 'test'
    }
    appStore.bind({
      paths: {
        // Non existent keys can be used. ClearX automatically updates components when data is available.
        // Array format over 'data.files.file1' guards against unexpected . in keypath
        fileOne: ['data', 'files', 'file1']
      },
      to: this,
      // Optional. Sets the default data for above paths.
      withDefaultData: {
        fileOne: {
          name: 'FileOne.txt'
        }
      },
      // Optional events
      events: {
        // Called after data is updated.
        afterUpdate: this.afterUpdate.bind(this)
      },
      // Optional. Automatically detected for React family UI components
      isReactFamilyUIComponent: true
    })
    // Data bound is automatically destroyed.
    // Expected: { localState1: 'test', store: { fileOne: <data from path> }}
    console.log(this.state.store)
  }
  afterUpdate (data) {
    console.log('State updated', data)
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

##### Slicing and attaching the data store to a plain class

```javascript

import appStore from './src/storeFile.js'

class Account {
  constructor () {
    this.sliced = appStore.bind({
      paths: {
        signedIn: ['user', 'signedIn']
      },
      to: this,
      events: {
        afterUpdate: this.checkData.bind(this)
      }
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
    // Need manual destroy for non UI components
    this.sliced.destroy()
  }
}

export default Account
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

##### Data reversal example

Data revert example:

```javascript
import appStore from './src/storeFile.js'

class MyCls {
  constructor () {
    this.sliceInstance = appStore.bind({
      paths: {
        fileTwo_Name: ['data', 'files', 'file2', 'name']
      },
      to: this
    })
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

Now go to http://localhost:8719/ to access todo application. The source is available under `./example` folder.

### API:

The ClearX instance has below API:

#### <code>bind</code>:  
Bind slice of data store to a Class or an Object or a UI component

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
