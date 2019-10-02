import Segment from './segment'
import DataObserver from './data-observer'
import { get, set, coalesce, empty, insert, push, pop, shift, splice, ensureExists, del, has, merge, hasEqual } from './object-utils'

class Clearx {
  constructor (data, { keySeperator = '.' }) {
    this.data = data
    this.segments = []
    this.dataObserver = new DataObserver(this)
    this.keySeperator = keySeperator
  }
  triggerEvents (key) {
    this.dataObserver.dataUpdatedAt(key)
  }
  executeUtil ([status, changed]) {
    if (changed) this.triggerEvents(key)
    return status
  }
  get (key, defaultValue) {
    return get(this.data, key, defaultValue)
  }
  set (key, value, doNotReplace = false) {
    return this.executeUtil(set(this.data, key, value, doNotReplace))
  }
  coalesce (keys, defaultValue) {
    return coalesce(this.data, keys, defaultValue)
  }
  empty (key) {
    return this.executeUtil(empty(this.data, key))
  }
  insert (key, value, position) {
    return this.executeUtil(insert(this.data, key, value, position))
  }
  push (key, ...values) {
    return this.executeUtil(push(this.data, key, ...values))
  }
  unshift (key, ...values) {
    return this.executeUtil(unshift(this.data, key, ...values))
  }
  pop (key) {
    return this.executeUtil(pop(this.data, key))
  }
  shift (key) {
    return this.executeUtil(shift(this.data, key))
  }
  splice (key, ...args) {
    return this.executeUtil(splice(this.data, key, ...args))
  }
  ensureExists (key, defaultValue) {
    return this.executeUtil(ensureExists(this.data, key, defaultValue))
  }
  delete (key) {
    return this.executeUtil(del(this.data, key))
  }
  has (key) {
    return has(this.data, key)
  }
  merge (key, data) {
    return this.executeUtil(merge(this.data, key, data))
  }
  bind (options) {
    const segment = new Segment({
      keySeperator: this.keySeperator,
      ...options
    }, this, this.dataObserver)
    this.segments.push(segment)
    return segment.interface
  }
  destroy () {
    this.segments.forEach((segment) => {
      segment.destroy()
    })
    this.dataObserver.destroy()
    this.data = {}
  }
}
export default Clearx
