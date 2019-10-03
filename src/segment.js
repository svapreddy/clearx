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
    const cacelObserver = this.dataObserver.attachObserver(listeningKeys, this.dataUpdated.bind(this))
    return () => {
      cacelObserver()
    }
  }
  listenUnmount () {
    const target = this.config.to
    if (Array.isArray(target)) return () => {}
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
  updateData () {
    let segment = {}
    const paths = this.config.paths
    for (const key in paths) {
      segment[key] = this.store.get(paths[key])
    }
    this._data = freezeObject(deepmerge({}, segment))
  }
  get data () {
    if (!this._data) {
      this.updateData()
    }
    return this._data
  }
  dataUpdated () {
    this.assignState()
  }
  assignStateStatelessComponent () {
    const to = this.config.to
    let _, setState
    if (Array.isArray(to)) {
      [_, setState] = to
    }
    if (!setState) return
    setState(this.data)
    to[0] = this.data
    return true
  }
  assignStateClassComponent () {
    let target = this.config.to
    if (typeof target.setState === 'function') {
      if (initialAssignment) {
        target.state = target.state || {}
        target.state.store = data
      } else {
        target.setState({
          store: data
        })
      }
      return true
    }
  }
  assignStateOthers () {
    const target = this.config.to
    if (typeof target === "object") {
      target.data = data
    }
  }
  assignState (initialAssignment) {
    this.updateData()
    const updatedSC = this.assignStateStatelessComponent()
    const updatedCC = this.assignStateClassComponent()
    if (!updatedSC && !updatedCC) {
      this.assignStateOthers()
    }
    const events = this.config
    if (events && typeof events.afterUpdate === 'function') {
      events.afterUpdate(this.data)
    }
    return this.data
  }
  bootstrap () {
    this.normalizePaths()
    this.detachListeners = this.attachListeners()
    this.destroy = this._destroy.bind(this)
  }
  _destroy () {
    this.detachListeners()
    this.store.destroySegment(this)
    delete this._data
    delete this.store
    delete this.config
    delete this.dataObserver
    this.active = false
  }
}

export default Segment
