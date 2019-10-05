import { split } from './object-utils'
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
    const id = `data-slice:${this.counter}`
    this.listeners[id] = {
      keys,
      listener
    }
    return () => {
      delete this.listeners[id]
    }
  }

  dataUpdatedAt (changedKey) {
    const seperator = '>>'
    const targets = []
    const changedPath = split(changedKey).join(seperator)
    for (const id in this.listeners) {
      let { keys, listener } = this.listeners[id]
      keys = keys.filter((key) => {
        const keyPath = split(key).join(seperator)
        return keyPath.startsWith(changedPath) || changedPath.startsWith(keyPath)
      })
      if (keys.length > 0) targets.push([keys, listener])
    }
    targets.forEach(([keys, listener]) => {
      try {
        listener(keys)
      } catch (ex) {
        console.log('Error updating', listener, keys)
      }
    })
  }

  teardown () {
    this.listeners = {}
  }
}
export default DataObserver
