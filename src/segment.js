import nanoid from 'nanoid'
import SegmentHelper from './segment-helper'

class Segment {
  constructor (paths, id, delimiter, store, dataObserver) {
    this.id = id || nanoid()
    this.paths = paths

    this._helper = new SegmentHelper(paths, delimiter, store, dataObserver)

    this.delimiter = delimiter
    this.store = store
    this.dataObserver = dataObserver
  }

  findComponent (search) {
    if (!this._helper) return -1
    if (Array.isArray(search)) {
      search = search[1]
    }
    const components = this._helper.components
    for (let i = 0; i < components.length; i++) {
      let component = components[i]
      if (Array.isArray(component)) {
        component = component[1]
      }
      if (search === component) {
        return i
      }
    }
    return -1
  }

  get data () {
    if (!this._helper) return {}
    return this._helper.data
  }

  get components () {
    if (!this._helper) return []
    return this._helper.components.slice(0)
  }

  get active () {
    if (!this._helper) return false
    return this._helper.hasDataListener
  }

  get afterUpdateEvents () {
    if (!this._helper) return []
    return this._helper.afterUpdateEvents
  }

  get dataTransformers () {
    if (!this._helper) return []
    return this._helper.dataTransformers
  }

  link (component) {
    if (!component) return {}
    const helper = this._helper
    if (!helper) return {}
    const store = this.store
    const unlink = store._unlinkComponentFromAllSegments.bind(store, component)
    const result = [this.data, unlink]
    if (this.findComponent(component) > -1) return result
    helper.components.push(component)
    helper.observe(this.keepSyncing)
    helper.addMark(component, this)
    helper.listenUnmount(component, unlink)
    helper.assignState(component, true)
    return result
  }

  unlink (component) {
    if (!component) return false
    const helper = this._helper
    if (!helper) return false
    const idx = this.findComponent(component)
    if (idx > -1) {
      helper.removeMark(component)
      helper.components.splice(idx, 1)
      helper.unlistenUnmount(component)
    }
    if ((helper.components.length === 0) && !this.keepSyncing) {
      helper.unobserve()
    }
    return idx > -1
  }

  sync (on = true) {
    if (!this._helper) return false
    this.keepSyncing = on
    if (on && !this.active) {
      this._helper.observe(true)
    }
    if (!on && this.active) {
      this._helper.unobserve()
    }
    return true
  }

  unlinkAll () {
    if (!this._helper) return false
    this._helper.components.forEach(this.unlink.bind(this))
    return true
  }

  onUpdate (func) {
    if (!this._helper) return () => {}
    return this._helper.onUpdate(func)
  }

  dataTransformer (func) {
    if (!this._helper) return () => {}
    return this._helper.dataTransformer(func)
  }

  teardown () {
    if (!this._helper) return true
    this.unlinkAll()
    this._helper.unobserve()
    delete this._helper
    delete this.dataObserver
    this.store.removeSegment(this)
    return true
  }
}

export default Segment
