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
    this.dataTransformers = []
  }

  dataTransformer (func) {
    if (typeof func === 'function') this.dataTransformers.push(func)
  }

  findComponent (search) {
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

  linkComponent (component) {
    if (!component) return
    const helper = this._helper
    const unlinkComponent = this.unlinkComponent.bind(this, component)
    const retObject = {
      data: this.data,
      unlinkComponent
    }
    if (this.findComponent(component) > -1) return retObject
    helper.components.push(component)
    helper.observe()
    helper.addMark(component, this)
    helper.listenUnmount(component, unlinkComponent)
    helper.assignState(component, true)
    return retObject
  }

  get data () {
    const helper = this._helper
    if (!helper.data) {
      helper.updateData()
    }
    return helper.data
  }

  get components () {
    return this._helper.components.slice(0)
  }

  get afterUpdateEvents () {
    return this._helper.afterUpdateEvents.slice(0)
  }

  unlinkComponent (component) {
    if (!component) return
    const helper = this._helper
    const idx = this.findComponent(component)
    if (idx > -1) {
      helper.removeMark(component)
      helper.components.splice(idx, 1)
      helper.unlistenUnmount(component)
    }
    if (helper.components.length === 0) {
      helper.unobserve()
    }
  }

  onUpdate (func) {
    if (typeof func === 'function') {
      this._helper.afterUpdateEvents.push(func)
    }
  }

  teardown () {
    delete this._helper
    delete this.dataObserver
  }
}

export default Segment
