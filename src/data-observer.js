class DataObserver {
  constructor (store) {
    this.store = store
    this.listeners = {}
    this.counter = 0
  }
  attachObserver (keys, listener) {
    if (!listener) return
    if (!keys || keys.length === 0) return
    ++this.counter
    const id = `data-slice:${counter}`
    this.listeners[id] = {
      keys,
      listener
    }
    return () => {
        delete this.listeners[id]
    }
  }
  dataUpdatedAt (keys) {
    
  }
  changed (changedKeys, updateId) {
    let targets = []
    changedKeys.forEach((changedKey) => {
      let handler, handlerKeys, matchedKeys
      for (handler in this.listeners) {
        handler = this.listeners[handler]
        handlerKeys = handler.keys
        matchedKeys = handlerKeys.filter((handlerKey) => {
          let _changedKey = changedKey.join('/')
          let _handlerKey = handlerKey.join('/')
          return (_handlerKey.indexOf(_changedKey) === 0) || (_changedKey.indexOf(_handlerKey) === 0)
        })
        if (matchedKeys.length > 0) {
          targets.push(handler.listener)
        }
      }
    })
    targets.forEach((listener) => {
      listener.updated && listener.updated(updateId)
    })
  }
  destroy () {
    this.listeners = {}
  }
}
export default DataObserver
