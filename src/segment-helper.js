import { split, freezeObject } from './object-utils'
import deepmerge from 'deepmerge'

class SegmentHelper {
  constructor (paths, delimiter = '.', store, dataObserver) {
    this.paths = paths
    this.delimiter = delimiter
    this.store = store
    this.dataObserver = dataObserver
    this.components = []
    this._afterUpdateEvents = []
    this._dataTransformers = []
  }

  get keys () {
    const paths = this.paths
    if (Array.isArray(paths)) return paths
    let keys = []
    if (typeof paths === 'string') {
      keys = [split(paths, this.delimiter)]
    } else if (paths.toString() === '[object Object]') {
      for (const key in paths) {
        if (!paths.hasOwnProperty(key)) continue
        keys.push(split(paths[key], this.delimiter))
      }
    } else {
      return paths
    }
    return keys
  }

  observe (force) {
    if (this.components.length === 0 && !force) return
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

  dataTransformer (func) {
    if (typeof func === 'function') {
      this._dataTransformers.push(func)
      this.updateComponents()
    }
  }

  get dataTransformers () {
    return this._dataTransformers.slice(0)
  }

  applyDataTransformers (data) {
    this._dataTransformers.forEach((func) => {
      try {
        data = func(data)
      } catch (ex) {
        console.log(func, 'failing to transform', data)
      }
    })
    return data
  }

  updateData () {
    let data = {}
    let paths = this.paths

    if (typeof paths === 'string') {
      paths = split(paths, this.delimiter)
      data = this.store.get(paths)
    } else if (Array.isArray(paths)) {
      data = paths.map((path) => {
        const key = split(path, this.delimiter)
        return this.store.get(key)
      })
    } else {
      for (const key in paths) {
        const path = split(paths[key], this.delimiter)
        data[key] = this.store.get(path)
      }
    }

    data = this.applyDataTransformers(data)

    if (typeof data === 'object') {
      data = freezeObject(deepmerge({}, data))
    }

    this._data = data
  }

  get data () {
    if (!this._data) {
      this.updateData()
    }
    return this._data
  }

  updateComponents () {
    this.updateData()
    this.components.forEach((component) => {
      this.assignState(component)
    })
    this.executeAfterUpdate()
  }

  assignStateFC (component, initialAssignment) {
    let setState
    if (Array.isArray(component)) {
      setState = component[1]
    }
    if (!setState) return
    if (initialAssignment) return true
    component[0] = this._data
    setState(this._data)
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
    if (typeof component === 'object') {
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

  onUpdate (func) {
    if (typeof func === 'function') {
      this._afterUpdateEvents.push(func)
    }
  }

  get afterUpdateEvents () {
    return this._afterUpdateEvents.slice(0)
  }

  executeAfterUpdate () {
    this._afterUpdateEvents.forEach((func) => {
      try {
        func(this.data)
      } catch (ex) {
        console.log(ex)
      }
    })
  }

  get hasDataListener () {
    return !!this.cancelDataListener
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
