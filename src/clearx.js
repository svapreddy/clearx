import Segment from './segment'
import DataObserver from './data-observer'
import { sort, get, set, coalesce, empty, insert, push, pop, shift, splice, unshift, ensureExists, del, has, merge, increment, decrement, toggle, isEqual, slice } from './object-utils'

class Clearx {
  constructor (data, { delimiter = '.' } = {}) {
    this.data = data
    this.segments = []
    this.dataObserver = new DataObserver(this)
    this.delimiter = delimiter
    this.onUpdateEvents = []
  }

  triggerEvents (key) {
    this.dataObserver.dataUpdatedAt(key)
  }

  executeUtil (key, [status, changed]) {
    if (changed) {
      this.triggerEvents(key)
    }
    this.executeOnUpdateEvents(changed, key)
    return status
  }

  get (key, defaultValue) {
    return get(this.data, key, defaultValue)
  }

  set (key, value, doNotReplace = false) {
    return this.executeUtil(key, set(this.data, key, value, doNotReplace))
  }

  coalesce (keys, defaultValue) {
    return coalesce(this.data, keys, defaultValue)
  }

  empty (key) {
    return this.executeUtil(key, empty(this.data, key))
  }

  insert (key, value, position) {
    return this.executeUtil(key, insert(this.data, key, value, position))
  }

  push (key, ...values) {
    return this.executeUtil(key, push(this.data, key, ...values))
  }

  unshift (key, ...values) {
    return this.executeUtil(key, unshift(this.data, key, ...values))
  }

  pop (key) {
    return this.executeUtil(key, pop(this.data, key))
  }

  shift (key) {
    return this.executeUtil(key, shift(this.data, key))
  }

  splice (key, ...args) {
    return this.executeUtil(key, splice(this.data, key, ...args))
  }

  slice (key, ...args) {
    return slice(this.data, key, ...args)
  }

  sort (key, ...args) {
    return this.executeUtil(key, sort(this.data, key, ...args))
  }

  ensureExists (key, defaultValue) {
    return this.executeUtil(key, ensureExists(this.data, key, defaultValue))
  }

  delete (key) {
    return this.executeUtil(key, del(this.data, key))
  }

  has (key) {
    return has(this.data, key)
  }

  merge (key, data) {
    return this.executeUtil(key, merge(this.data, key, data))
  }

  increment (key, by) {
    return this.executeUtil(key, increment(this.data, key, by))
  }

  decrement (key, by) {
    return this.executeUtil(key, decrement(this.data, key, by))
  }

  toggle (key) {
    return this.executeUtil(key, toggle(this.data, key))
  }

  isEqual (key, value) {
    return isEqual(this.data, key, value)
  }

  paths (keys, id, delimiter) {
    const segment = new Segment(keys, id, delimiter || this.delimiter, this, this.dataObserver)
    this.segments.push(segment)
    return segment
  }

  bind (options = {}) {
    const { to, afterUpdate, id, delimiter, paths } = options
    let component = to
    if (Array.isArray(component)) {
      component = to[1]
    }
    let segment
    segment = component.__segment
    if (segment) {
      return segment.link(to)
    }
    segment = this.paths(paths, id, delimiter)
    segment.onUpdate(afterUpdate)
    const link = segment.link(to)

    if (Array.isArray(to)) {
      return link
    }
    return segment
  }

  removeSegment (segment) {
    const index = this.segments.indexOf(segment)
    if (index > -1) {
      segment.teardown()
      this.segments.splice(index, 1)
    }
  }

  onUpdate (func) {
    if (typeof func === 'function') {
      this.onUpdateEvents.push(func)
    }
  }

  executeOnUpdateEvents (changed, changedKeys) {
    this.onUpdateEvents.forEach((func) => {
      try {
        func(changed, changedKeys, this.data, this)
      } catch (ex) {
        console.log('onUpdate', func, changedKeys)
      }
    })
  }

  teardown () {
    this.segments.forEach((segment) => {
      segment.teardown()
    })
    this.dataObserver.teardown()
    delete this.dataObserver
    this.data = {}
  }
}
export default Clearx
