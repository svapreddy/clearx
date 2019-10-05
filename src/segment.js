import nanoid from 'nanoid'
import SegmentHelper from './segment-helper'

class Segment {
  constructor (paths, id, keySeperator, store, dataObserver) {
    this.id = id || nanoid()
    this.paths = paths

    this._helper = new SegmentHelper(paths, keySeperator, store, dataObserver)

    this.keySeperator = keySeperator
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
    return this._helper.data
  }

  get components () {
    return this._helper.components.slice(0)
  }

  get active () {
    return this._helper.hasDataListener
  }

  get afterUpdateEvents () {
    return this._helper.afterUpdateEvents
  }

  get dataTransformers () {
    return this._helper.dataTransformers
  }

  link (component) {
    if (!component) return {}
    const helper = this._helper
    if (!helper) return {}
    const unlink = this.unlink.bind(this, component)
    const retObject = {
      data: this.data,
      unlink
    }
    if (this.findComponent(component) > -1) return retObject
    helper.components.push(component)
    helper.observe(this.keepSyncing)
    helper.addMark(component, this)
    helper.listenUnmount(component, unlink)
    helper.assignState(component, true)
    return retObject
  }

  unlink (component) {
    if (!component) return
    const helper = this._helper
    if (!helper) return
    const idx = this.findComponent(component)
    if (idx > -1) {
      helper.removeMark(component)
      helper.components.splice(idx, 1)
      helper.unlistenUnmount(component)
    }
    if ((helper.components.length === 0) && !this.keepSyncing) {
      helper.unobserve()
    }
  }

  sync (on = true) {
    this.keepSyncing = on
    if (on && !this.active) {
      this._helper.observe(true)
    }
    if (!on && this.active) {
      this._helper.unobserve()
    }
  }

  unlinkAll () {
    this._helper.components.forEach(this.unlink.bind(this))
  }

  onUpdate (func) {
    this._helper.onUpdate(func)
  }

  dataTransformer (func) {
    this._helper.dataTransformer(func)
  }

  teardown () {
    this.unlinkAll()
    delete this._helper
    delete this.dataObserver
  }
}

export default Segment
