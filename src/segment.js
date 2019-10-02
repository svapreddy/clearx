import { split, freezeObject } from './object-utils'
import deepmerge from 'deepmerge'

class Segment {
  constructor (config, store, dataObserver) {
    this.config = config
    this.store = store
    this.dataObserver = dataObserver
    this.detachListeners = () => {}
    this.keySeperator = '.'
    this.listeningKeys = {}
    this.bootstrap()
    this.active = true
  }
  attachListeners () {
    const dataChanges = this.listenDataChanges()
    const onUnmount = this.listenUnmount()
    return () => {
      dataChanges()
      onUnmount()
    }
  }
  normalizePaths () {
    let listeningKeys = {}
    let paths = this.config.paths
    for (const key in paths) {
      if (paths.hasOwnProperty(key)) {
        listeningKeys[key] = split(paths[key], this.keySeperator)
      }
    }
    this.listeningKeys = listeningKeys
  }
  listenDataChanges () {
    let listeningKeys = Object.values(this.listeningKeys)
    this.dataObserver.attachObserver(listeningKeys, this.dataUpdated.bind(this))
    return () => {
      this.dataObserver.detachObserver(this)
    }
  }
  listenUnmount () {
    const target = this.config.to
    this.componentWillUnmount = target.componentWillUnmount

    target.componentWillUnmount = () => {
      this.destroy()
      if (typeof this.componentWillUnmount === 'function') {
        this.componentWillUnmount.call(target)
      }
    }

    return () => {
      target.componentWillUnmount = this.componentWillUnmount
      delete this.componentWillUnmount
    }
  }
  get data () {
    let segment = {}
    const paths = this.config.paths
    for (const key in paths) {
      segment[key] = this.store.get(paths[key])
    }
    return freezeObject(deepmerge({}, segment))
  }
  dataUpdated () {
    this.assignState()
  }
  assignState (initialAssignment) {
    let target, setState
    if (Array.isArray(this.config.to)) {
      [target, setState] = this.config.to
    } else {
      target = this.config.to
    }
    const data = this.data
    if (typeof setState === 'function') {
      !initialAssignment && setState(data)
    } else if (typeof target.setState === 'function') {
      if (initialAssignment) {
        target.state = target.state || {}
        target.state.store = data
      } else {
        target.setState({
          store: data
        })
      }
    } else {
      target.store = data
    }
    const events = this.config
    if (events && typeof events.afterUpdate === 'function') {
      events.afterUpdate(data)
    }
    return data
  }
  bootstrap () {
    this.normalizePaths()
    this.detachListeners = this.attachListeners()
    this.interface = {
      store: this.assignState(true),
      destroy: this.destroy.bind(this)
    }
    freezeObject(this.interface)
  }
  destroy () {
    this.detachListeners()
  }
}

export default Segment
