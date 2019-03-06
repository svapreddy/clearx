export default class Handler {
  constructor (store) {
    this.store = store
    this.count = 0
    this.id = this.store.nextId
    this.listeners = {}
  }
  key (arr) {
    return (arr || []).join('|')
  }
  listen (keys, listener) {
    if (!listener) return
    const id = listener.id || this.store.nextId
    this.listeners[id] = {
      keys,
      listener
    }
    return id
  }
  ignore (listener) {
    if (!listener) return
    delete this.listeners[listener.id]
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
