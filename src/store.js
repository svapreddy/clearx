import objectpath from 'object-path'
import deepmerge from 'deepmerge'
import equal from 'fast-deep-equal'

import Handler from './handler'
import Slice from './slice'

let dataCollection = {}

export default class Store {
  constructor (data) {
    this.count = 0
    this.id = this.nextId
    this.slicers = {}
    this.handler = new Handler(this)
    dataCollection[this.id] = data
  }
  get nextId () {
    this.count += 1
    return Date.now() + this.count + ''
  }
  get localStores () {
    return this.slicers
  }
  get data () {
    return dataCollection[this.id]
  }
  // set values
  set (key, value) {
    let old = this.get(key)
    // if has same value, do not set
    if (old && equal(old, value)) return
    objectpath.set(this.data, key, value)
    this.handler.changed([key])
  }
  // get deep property
  get (key, defaultValue) {
    return objectpath.get(this.data, key, defaultValue)
  }
  // get the first non-undefined value
  coalesce (keys, defaultValue) {
    return objectpath.coalesce(this.data, keys, defaultValue)
  }
  // empty a given path (but do not delete it) depending on their type,so it retains reference to objects and arrays.
  empty (key) {
    objectpath.empty(this.data, key)
    this.handler.changed([key])
  }
  // will insert values in array at given position
  insert (key, value, position) {
    objectpath.insert(this.data, key, value, position)
    this.handler.changed([key])
  }
  // push into arrays (and create intermediate objects/arrays)
  push (key /*, values */) {
    let args = [this.data, key]
    args.push.apply(args, Array.prototype.slice.call(arguments, 1))
    objectpath.push.apply(objectpath, args)
    this.handler.changed([key])
  }
  // ensure a path exists (if it doesn't, set the default value you provide)
  ensureExists (key, defaultValue) {
    let exists = this.has(key)
    if (!exists) {
      objectpath.ensureExists(this.data, key, defaultValue)
      this.handler.changed([key])
    }
  }
  // deletes a path
  del (key) {
    objectpath.del(this.data, key)
    this.handler.changed([key])
  }
  // tests path existence
  has (key) {
    return objectpath.has(this.data, key)
  }
  // Merge data from another Object
  merge (key, data, options) {
    if (!key || !data) return
    let old = this.get(key)
    if (equal(old, data)) return
    this.set(key, deepmerge(old, data))
  }
  // For React components: Extracts the data from the store. This slice will be in sync with the initial global data set
  slice (map, context, config) {
    let instance = new Slice(map, context, config, this, this.handler)
    this.slicers[instance.id] = instance
    return this.slicers[instance.id]
  }
  destroy () {
    for (let id in this.slicers) {
      this.slicers[id].destroy()
    }
    this.handler.destroy()
    this.slicers = {}
    this.handler = null
    delete dataCollection[this.id]
  }
}
