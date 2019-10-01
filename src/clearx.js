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
  _hasEqual (key, data) {
    const val = this.get(key)
    return hasEqual(val, data)
  }
  get (key, defaultValue) {
    return get(this.data, key, defaultValue)
  }
  set (key, value, doNotReplace = false) {
    if (_hasEqual(key, value)) return true
    const result = set(this.data, key, value, doNotReplace)
    triggerEvents(key)
  }
  coalesce (keys, defaultValue) {
    return coalesce(this.data, keys, defaultValue)
  }
  empty (key) {
    return empty(this.data, key)
  }
  insert (key, value, position) {
    return insert(this.data, key, value, position)
  }
  push (key, ...values) {
    return push(this.data, key, ...values)
  }
  unshift (key, ...values) {
    return push(this.data, key, ...values)
  }
  pop (key) {
    return pop(this.data, key)
  }
  shift (key) {
    return shift(this.data, key)
  }
  splice (key, ...args) {
    return splice(this.data, key, ...args)
  }
  ensureExists (key, defaultValue) {
    return ensureExists(this.data, key, defaultValue)
  }
  delete (key) {
    return del(this.data, key)
  }
  has (key) {
    return has(this.data, key)
  }
  merge (key, data) {
    return merge(this.data, key, data)
  }
  bind (options) {
    const segment = new Segment({
      keySeperator: this.keySeperator,
      ...options
    }, this, this.dataObserver)
    this.segments.push(segment)
    return segment
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
