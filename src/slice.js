import objectpath from 'object-path'
import equal from 'fast-deep-equal'
import deepmerge from 'deepmerge'

export default class Slice {
  constructor (map, context, config = {}, store, handler) {
    this.id = store.nextId
    this.storeConfig.apply(this, arguments)
    this.bootstrap()
  }
  storeConfig (map, context, config = {}, store, handler) {
    this.store = store
    this.handler = handler
    this.map = map
    this.targetObj = context
    this.updateCallback = config.updateCallback || ((data) => {})
    this.defaults = config.defaults || {}
    this.reactLike = config.reactLike
    if (this.reactLike === undefined) {
      this.reactLike = this.isReactLike(context) || false
    }
  }
  isReactLike (instance) {
    // https://github.com/facebook/react/blob/b1b4a2fb252f26fe10d29ba60d85ff89a85ff3ec/src/isomorphic/modern/class/ReactBaseClasses.js#L33
    return (!!instance.isReactComponent || ((typeof instance.setState === 'function') && (typeof instance.render === 'function')))
  }
  listen () {
    let keys = []
    for (let key in this.map) {
      keys.push(this.map[key])
    }
    this.handler.listen(keys, this)
  }
  removeListen () {
    this.handler.ignore(this)
  }
  componentWillUnmount () {
    if (!this.reactLike) return
    // Call original handler that view has!
    if (this.orig_componentWillUnmount) {
      this.orig_componentWillUnmount.apply(this.targetObj, arguments)
    }
    this.destroy()
  }
  revokeComponentWillUnmountHook () {
    if (!this.reactLike) return
    this.targetObj.componentWillUnmount = this.orig_componentWillUnmount
  }
  addComponentWillUnmountHook () {
    if (!this.reactLike) return
    let context = this.targetObj
    let eventName = 'componentWillUnmount'
    if (context[eventName]) {
      this.orig_componentWillUnmount = context[eventName]
    }
    context[eventName] = this[eventName].bind(this)
  }
  initialValues () {
    let defaults = this.defaults
    let map = this.map
    let path
    let storeData = this.store.data
    let changedKeys = []
    for (let key in defaults) {
      path = map[key]
      changedKeys.push(path)
      objectpath.set(storeData, path, defaults[key])
    }
    this.handler.changed(changedKeys)
  }
  initialize () {
    this.initialValues()
    this._assignState()
  }
  isNewData (nextState) {
    let store = nextState.store
    let data = this.slice
    return !equal(store, data)
  }
  _assignState () {
    let context = this.targetObj
    const initialData = this.slice
    if (this.reactLike) {
      context.state = context.state || {}
      context.state.store = initialData
    } else {
      context.store = initialData
    }
  }
  _updateState () {
    let context = this.targetObj
    const newData = this.slice
    if (this.reactLike) {
      this.targetObj.setState({
        store: newData
      })
    } else {
      context.store = newData
      if (typeof this.updateCallback === 'function') {
        this.updateCallback(newData)
      }
    }
  }
  setState (data, afterCb) {
    let context = this.targetObj
    if (this.reactLike) {
      if (typeof data === 'function') {
        context.setState((state) => {
          state = data(state)
          if (state.store) {
            this.slice = state.store
          }
          return state
        }, afterCb)
      } else {
        context.setState(data, () => {
          if (data.store) {
            this.slice = data.store
          }
          if (typeof afterCb === 'function') {
            afterCb()
          }
        })
      }
    } else {
      this.slice = data
    }
  }
  updated (updateId) {
    if ((updateId === this.id) || !this.store) return
    this._updateState()
  }
  bootstrap () {
    this.addComponentWillUnmountHook()
    this.initialize()
    this.listen()
  }
  destroy () {
    this.removeListen()
    this.revokeComponentWillUnmountHook()
    this.map = null
    this.targetObj = null
    this.defaults = null
    this.store = null
    this.handler = null
  }
  get slice () {
    let data = {}
    let map = this.map
    let storeValue, key
    let storeData = this.store.data
    for (key in map) {
      storeValue = objectpath.get(storeData, map[key])
      objectpath.set(data, key, storeValue)
    }
    return data
  }
  get clone () {
    let data = deepmerge({}, this.slice)
    return data
  }
  set slice (state) {
    let map = this.map
    let stateValue, key, storeValue
    let changed = []
    let data = this.slice
    let storeData = this.store.data
    for (key in map) {
      stateValue = state[key]
      storeValue = data[key]
      if (!equal(stateValue, storeValue)) {
        objectpath.set(storeData, map[key], stateValue)
        changed.push(map[key])
      }
    }
    if (changed.length > 0) {
      this.handler.changed(changed, this.id)
    }
  }
}
