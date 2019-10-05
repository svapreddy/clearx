import { split, freezeObject } from './object-utils'
import deepmerge from 'deepmerge'

class SegmentHelper {
  constructor (paths, keySeperator = '.', store, dataObserver) {
    this.paths = paths
    this.keySeperator = keySeperator
    this.store = store
    this.dataObserver = dataObserver
    this.components = []
    this.afterUpdateEvents = []
  }
  get keys () {
    const paths = this.paths
    if (Array.isArray(paths)) return paths
    let keys = []
    if (typeof paths === "string") {
      keys = [split(paths, this.keySeperator)]
    } else if (paths.toString() === "[object Object]") {
      for (let key in paths) {
        if (!paths.hasOwnProperty(key)) continue
        keys.push(split(paths[key], this.keySeperator))
      }
    } else {
      return paths
    }
    return keys
  }
  observe () {
    if (this.components.length === 0) return
    if (this.cancelObserver) return

    const observer = this.dataObserver
    const keys = this.keys
    const listener = this.updateComponents.bind(this)
    this.cancelDataListener = observer.attachObserver(keys, listener)
  }
  unobserve () {
    if (!this.cancelDataListener) return
    this.cancelDataListener()
    delete this.cancelDataListener
  }
  listenUnmount (component, onUnmount) {
    if (Array.isArray(component)) return () => {}
    const componentWillUnmount = component.componentWillUnmount
    component.componentWillUnmount = () => {
      onUnmount()
      if (typeof this.componentWillUnmount === 'function') {
        this.componentWillUnmount.call(component)
      }
    }
    component.componentWillUnmount.__original = componentWillUnmount
  }
  unlistenUnmount (component) {
    const componentWillUnmount = component.componentWillUnmount
    if (!componentWillUnmount) return
    const original = component.componentWillUnmount.__original
    if (!original) return
    component.componentWillUnmount = original
  }
  updateData () {
    let data = {}
    let paths = this.paths

    if (typeof paths === "string") {
        paths = split(paths, this.keySeperator)
        data = this.store.get(paths)
    } else if (Array.isArray(paths)) {
        data = paths.map((path) => {
            let key = split(path, this.keySeperator)
            return this.store.get(key)
        })
    } else {
        for (let key in paths) {
            let path = split(paths[key], this.keySeperator)
            data[key] = this.store.get(path)
        }
    }

    if (typeof data === "object") {
        data = freezeObject(deepmerge({}, data))
    }

    this.data = data
  }
  updateComponents () {
    this.updateData()
    this.components.forEach((component) => {
      this.assignState(component)
    })
    this.executeAfterUpdate()
  }
  assignStateFC (component, initialAssignment) {
    let _, setState
    if (Array.isArray(component)) {
      [_, setState] = component
    }
    if (!setState) return
    if (initialAssignment) return true
    setState(this.data)
    component[0] = this.data
    return true
  }
  assignStateCC (component, initialAssignment) {
    if (typeof component.setState !== 'function') return
    if (initialAssignment) {
      component.state = component.state || {}
      component.state.store = this.data
    } else {
      component.setState({
        store: this.data
      })
    }
    return true
  }
  assignStateOthers (component) {
    if (typeof component === "object") {
      component.data = this.data
    }
  }
  assignState (component, initial = false) {
    const updatedSC = this.assignStateFC(component, initial)
    const updatedCC = this.assignStateCC(component, initial)
    if (!updatedSC && !updatedCC) {
      this.assignStateOthers(component, initial)
    }
  }
  executeAfterUpdate () {
    this.afterUpdateEvents.forEach((func) => {
      try {
        func(this.data)
      } catch (ex) {
        console.log(ex)
      }
    })
  }
  addMark (component, mark) {
    let comp = component
    if (Array.isArray(component)) {
      comp = component[1]
    }
    comp.__segment = mark
  }
  removeMark (component) {
    let comp = component
    if (Array.isArray(component)) {
      comp = component[1]
    }
    delete comp.__segment
  }
}

export default SegmentHelper