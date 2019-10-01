import { isReactFamilyComponent } from './utils'
import { split } from './object-utils'

class Segment {
  constructor (config, store, dataObserver) {
    
    this.config = config
    this.store = store
    this.dataObserver = dataObserver
    this.detachListeners = () => {}
    this.keySeperator = '.'
    this.listeningKeys = {}
    this.isBoundToReactComponent = isReactFamilyComponent(config.to)
    this.bootstrap()
    this.active = true
  }
  attachListeners () {
    const dataChanges = this.listenDataChanges()
    const unmountHook = this.listenUnmount()
    return () => {
      dataChanges()
      unmountHook()
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
    if (!this.isBoundToReactComponent) { return () => {} }
    const target = this.config.to
    this.componentWillUnmount = target.componentWillUnmount
    target.componentWillUnmount = pipe(() => {
      this.destroy()
    }, () => {
      if (this.componentWillUnmount) {
        this.componentWillUnmount.call(target)
      }
    })
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
    return segment
  }
  dataUpdated () {
    this.assignState()
  }
  assignState () {
    let data = this.data
    const target = this.config.to
    let context = this.targetObj
    const initialData = this.slice

    if (this.reactLike) {
      context.state = context.state || {}
      context.state.store = initialData
    } else {
      context.store = initialData
    }
  }
  bootstrap () {
    this.normalizePaths()
    this.detachListeners = this.attachListeners()
    this.assignState()
  }
  destroy () {
    this.detachListeners()
  }
}
export default Segment
