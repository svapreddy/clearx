'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deepmerge = _interopDefault(require('deepmerge'));
var equal = _interopDefault(require('fast-deep-equal'));

let counter = 0;

let generate = () => {
  counter += 1;
  return `clearx-${counter}`
};

const toNumber = (val) => {
  if (!isNaN(val)) {
    return val * 1
  }
  return val
};

const assign = (obj, key, val) => {
  if (hasEqual(obj[key], val)) return false
  obj[key] = val;
  return obj[key] === val
};

const freezeObject = (obj) => {
  if (Object.freeze) Object.freeze(obj);
  return obj
};

const hasEqual = (obj1, obj2) => {
  return obj1 !== undefined && equal(obj1, obj2)
};

const split = (path, seperator = '.', escape = '\\') => {
  if (!path) return []
  if (Array.isArray(path)) return path
  const keys = [];
  let key = '';
  for (let i = 0, l = path.length; i < l; ++i) {
    const charKey = path[i];
    if ((charKey === seperator) && (path[i - 1] !== escape)) {
      if (key.length > 0) {
        keys.push(toNumber(key));
      }
      key = '';
    } else {
      if (charKey !== escape) {
        key += path[i];
      }
    }
  }
  if (key.length > 0) {
    keys.push(toNumber(key));
  }
  return keys
};

const get = (obj, keys, defaultValue) => {
  if (obj === undefined) return defaultValue
  if (!keys || keys.length === 0) {
    return obj
  }
  keys = split(keys);
  let [key, ...remaining] = keys;
  if (!isNaN(key)) {
    key *= 1;
  }
  return get(obj[key], remaining, defaultValue)
};

const set = (obj, keys, value, dontReplace) => {
  let isDataUpdated = false;

  if (obj === undefined) return [false, isDataUpdated]
  if (!keys || keys.length === 0) return [false, isDataUpdated]

  keys = split(keys);
  const [key, next, ...remaining] = keys;
  if (next !== undefined) {
    if (!obj.hasOwnProperty(key)) {
      const val = !isNaN(next) ? [] : {};
      isDataUpdated = assign(obj, key, val);
    }
    const [_, __] = set(obj[key], [next, ...remaining], value, dontReplace);
    return [_, __ || isDataUpdated]
  } else {
    if (obj.hasOwnProperty(key) && dontReplace) return [true, isDataUpdated]
    isDataUpdated = assign(obj, key, value);
    return [true, isDataUpdated]
  }
};

const has = (obj, keys) => {
  const value = get(obj, keys);
  if (value === undefined) return false
  return true
};

const ensureExists = (obj, keys, value = null) => {
  return set(obj, keys, value, true)
};

const arrayMethods = ['push', 'pop', 'splice', 'shift', 'unshift', 'sort', 'slice'];

const arrayOps = (obj, keys, method, ...args) => {
  if (arrayMethods.indexOf(method) === -1) return false
  let arr = get(obj, keys);
  if (!Array.isArray(arr)) {
    arr = [];
    set(obj, keys, arr);
  }
  let val;
  try {
    val = arr[method].apply(arr, args);
  } catch (ex) {
    // Probably freeze!
  }
  return [true, true, val]
};

const push = (obj, keys, ...values) => {
  return arrayOps(obj, keys, 'push', ...values)
};

const insert = (obj, keys, value, at) => {
  if (at === undefined) {
    return push(obj, keys, value)
  }
  return arrayOps(obj, keys, 'splice', at, 0, value)
};

const unshift = (obj, keys, ...args) => {
  return arrayOps(obj, keys, 'unshift', ...args)
};

const pop = (obj, keys) => {
  return arrayOps(obj, keys, 'pop')
};

const shift = (obj, keys) => {
  return arrayOps(obj, keys, 'shift')
};

const splice = (obj, keys, ...args) => {
  return arrayOps(obj, keys, 'splice', ...args)
};

const slice = (obj, keys, ...args) => {
  const result = arrayOps(obj, keys, 'slice', ...args);
  return result[2]
};

const sort = (obj, keys, ...args) => {
  return arrayOps(obj, keys, 'sort', ...args)
};

const increment = (obj, keys, by = 1) => {
  let val = get(obj, keys) * 1;
  if (isNaN(val)) {
    val = 0;
  }
  val += by;
  return set(obj, keys, val)
};

const decrement = (obj, keys, by = 1) => {
  return increment(obj, keys, by * -1)
};

const toggle = (obj, keys) => {
  const existing = !!get(obj, keys);
  return set(obj, keys, !existing)
};

const empty = (obj, keys) => {
  let isDataUpdated = false;
  const value = get(obj, keys);
  if (value === undefined) return [true, isDataUpdated]
  let finalValue;
  switch (true) {
    case typeof value === 'string':
      finalValue = '';
      break
    case typeof value === 'number':
      finalValue = 0;
      break
    case typeof value === 'boolean':
      finalValue = false;
      break
    case Array.isArray(value):
      value.length = 0;
      return [true, value.length === 0]
    case typeof value === 'object':
      for (const i in value) {
        if (value.hasOwnProperty(i)) {
          isDataUpdated = delete value[i] || isDataUpdated;
        }
      }
      return [true, isDataUpdated]
  }
  return set(obj, keys, finalValue)
};

const coalesce = (obj, keysArr, defaultValue) => {
  for (let i = 0, l = keysArr.length; i < l; ++i) {
    const val = get(obj, keysArr[i]);
    if (val !== undefined && val !== null) {
      return val
    }
  }
  return defaultValue
};

const del = (obj, keys) => {
  let isDataUpdated = false;
  if (obj === undefined) return [false, isDataUpdated]
  if (!keys || keys.length === 0) return [false, isDataUpdated]
  keys = split(keys);
  const [key, ...remaining] = keys;
  if (keys.length === 1) {
    if (Array.isArray(obj) && !isNaN(key)) {
      const len = obj.length;
      obj.splice(key, 1);
      isDataUpdated = len !== obj.length;
    } else if (obj.hasOwnProperty(key)) {
      isDataUpdated = delete obj[key];
    }
    return [true, isDataUpdated]
  } else {
    return del(obj[key], [...remaining])
  }
};

const merge = (obj, keys, data) => {
  ensureExists(obj, keys, Array.isArray(data) ? [] : {});
  const current = get(obj, keys);
  const merged = deepmerge(current, data);
  return set(obj, keys, merged)
};

const isEqual = (obj, keys, data) => {
  const current = get(obj, keys);
  return equal(current, data)
};

class SegmentHelper {
  constructor (paths, delimiter = '.', store, dataObserver) {
    this.paths = paths;
    this.delimiter = delimiter;
    this.store = store;
    this.dataObserver = dataObserver;
    this.components = [];
    this._afterUpdateEvents = [];
    this._dataTransformers = [];
  }

  get keys () {
    const paths = this.paths;
    if (Array.isArray(paths)) return paths
    let keys = [];
    if (typeof paths === 'string') {
      keys = [split(paths, this.delimiter)];
    } else if (paths.toString() === '[object Object]') {
      for (const key in paths) {
        if (!paths.hasOwnProperty(key)) continue
        keys.push(split(paths[key], this.delimiter));
      }
    } else {
      return paths
    }
    return keys
  }

  observe (force) {
    if (this.components.length === 0 && !force) return
    if (this.cancelObserver) return

    const observer = this.dataObserver;
    const keys = this.keys;
    const listener = this.updateComponents.bind(this);
    this.cancelDataListener = observer.attachObserver(keys, listener);
  }

  unobserve () {
    if (!this.cancelDataListener) return
    this.cancelDataListener();
    delete this.cancelDataListener;
  }

  listenUnmount (component, onUnmount) {
    if (Array.isArray(component)) return () => {}
    const componentWillUnmount = component.componentWillUnmount;
    component.componentWillUnmount = () => {
      onUnmount();
      if (typeof this.componentWillUnmount === 'function') {
        this.componentWillUnmount.call(component);
      }
    };
    component.componentWillUnmount.__original = componentWillUnmount;
  }

  unlistenUnmount (component) {
    const componentWillUnmount = component.componentWillUnmount;
    if (!componentWillUnmount) return
    const original = component.componentWillUnmount.__original;
    if (!original) return
    component.componentWillUnmount = original;
  }

  dataTransformer (func) {
    if (typeof func === 'function') {
      this._dataTransformers.push(func);
      this.updateComponents();
      return () => {
        const idx = this._dataTransformers.indexOf(func);
        if (idx > -1) this._dataTransformers.splice(idx, 1);
      }
    }
    return () => {}
  }

  get dataTransformers () {
    return this._dataTransformers.slice(0)
  }

  applyDataTransformers (data) {
    this._dataTransformers.forEach((func) => {
      try {
        data = func(data);
      } catch (ex) {
        console.log(func, 'failing to transform', data);
      }
    });
    return data
  }

  updateData () {
    let data = {};
    let paths = this.paths;

    if (typeof paths === 'string') {
      paths = split(paths, this.delimiter);
      data = this.store.get(paths);
    } else if (Array.isArray(paths)) {
      data = paths.map((path) => {
        const key = split(path, this.delimiter);
        return this.store.get(key)
      });
    } else {
      for (const key in paths) {
        const path = split(paths[key], this.delimiter);
        data[key] = this.store.get(path);
      }
    }

    data = this.applyDataTransformers(data);

    if (typeof data === 'object') {
      data = freezeObject(deepmerge({}, data));
    }

    this._data = data;
  }

  get data () {
    if (!this._data) {
      this.updateData();
    }
    return this._data
  }

  updateComponents () {
    this.updateData();
    this.components.forEach((component) => {
      this.assignState(component);
    });
    this.executeAfterUpdate();
  }

  assignStateFC (component, initialAssignment) {
    let setState;
    if (Array.isArray(component)) {
      setState = component[1];
    }
    if (!setState) return
    if (initialAssignment) return true
    component[0] = this._data;
    setState(this._data);
    return true
  }

  assignStateCC (component, initialAssignment) {
    if (typeof component.setState !== 'function') return
    if (initialAssignment) {
      component.state = component.state || {};
      component.state.store = component.state.store || {};
      component.state.store = {
        ...component.state.store,
        ...this.data
      };
    } else {
      component.setState({
        ...component.state,
        store: {
          ...component.state.store,
          ...this.data
        }
      });
    }
    return true
  }

  assignStateOthers (component) {
    if (typeof component === 'object') {
      component.data = this.data;
    }
  }

  assignState (component, initial = false) {
    const updatedSC = this.assignStateFC(component, initial);
    const updatedCC = this.assignStateCC(component, initial);
    if (!updatedSC && !updatedCC) {
      this.assignStateOthers(component, initial);
    }
  }

  onUpdate (func) {
    if (typeof func === 'function') {
      this._afterUpdateEvents.push(func);
      return () => {
        const idx = this._afterUpdateEvents.indexOf(func);
        if (idx > -1) this._afterUpdateEvents.splice(idx, 1);
      }
    }
    return () => {}
  }

  get afterUpdateEvents () {
    return this._afterUpdateEvents.slice(0)
  }

  executeAfterUpdate () {
    this._afterUpdateEvents.forEach((func) => {
      try {
        func(this.data);
      } catch (ex) {
        console.log(ex);
      }
    });
  }

  get hasDataListener () {
    return !!this.cancelDataListener
  }

  addMark (component, mark) {
    let comp = component;
    if (Array.isArray(component)) {
      comp = component[1];
    }
    comp.__segment = mark;
  }

  removeMark (component) {
    let comp = component;
    if (Array.isArray(component)) {
      comp = component[1];
    }
    delete comp.__segment;
  }
}

class Segment {
  constructor (paths, id, delimiter, store, dataObserver) {
    this.id = id || generate();
    this.paths = paths;

    this._helper = new SegmentHelper(paths, delimiter, store, dataObserver);

    this.delimiter = delimiter;
    this.store = store;
    this.dataObserver = dataObserver;
  }

  findComponent (search) {
    if (!this._helper) return -1
    if (Array.isArray(search)) {
      search = search[1];
    }
    const components = this._helper.components;
    for (let i = 0; i < components.length; i++) {
      let component = components[i];
      if (Array.isArray(component)) {
        component = component[1];
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
    const helper = this._helper;
    if (!helper) return {}
    const store = this.store;
    const unlink = store._unlinkComponentFromAllSegments.bind(store, component);
    const result = [this.data, unlink];
    if (this.findComponent(component) > -1) return result
    helper.components.push(component);
    helper.observe(this.keepSyncing);
    helper.addMark(component, this);
    helper.listenUnmount(component, unlink);
    helper.assignState(component, true);
    return result
  }

  unlink (component) {
    if (!component) return false
    const helper = this._helper;
    if (!helper) return false
    const idx = this.findComponent(component);
    if (idx > -1) {
      helper.removeMark(component);
      helper.components.splice(idx, 1);
      helper.unlistenUnmount(component);
    }
    if ((helper.components.length === 0) && !this.keepSyncing) {
      helper.unobserve();
    }
    return idx > -1
  }

  sync (on = true) {
    if (!this._helper) return false
    this.keepSyncing = on;
    if (on && !this.active) {
      this._helper.observe(true);
    }
    if (!on && this.active) {
      this._helper.unobserve();
    }
    return true
  }

  unlinkAll () {
    if (!this._helper) return false
    this._helper.components.forEach(this.unlink.bind(this));
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
    this.unlinkAll();
    this._helper.unobserve();
    delete this._helper;
    delete this.dataObserver;
    this.store.removeSegment(this);
    return true
  }
}

class DataObserver {
  constructor (store) {
    this.store = store;
    this.listeners = {};
    this.counter = 0;
  }

  attachObserver (keys, listener) {
    if (!listener) return
    if (!keys || keys.length === 0) return
    ++this.counter;
    const id = `data-slice:${this.counter}`;
    this.listeners[id] = {
      keys,
      listener
    };
    return () => {
      delete this.listeners[id];
    }
  }

  dataUpdatedAt (changedKey) {
    const seperator = '>>';
    const targets = [];
    const changedPath = split(changedKey).join(seperator);
    for (const id in this.listeners) {
      let { keys, listener } = this.listeners[id];
      keys = keys.filter((key) => {
        const keyPath = split(key).join(seperator);
        return keyPath.startsWith(changedPath) || changedPath.startsWith(keyPath)
      });
      if (keys.length > 0) targets.push([keys, listener]);
    }
    targets.forEach(([keys, listener]) => {
      try {
        listener(keys);
      } catch (ex) {
        console.log('Error updating', listener, keys);
      }
    });
  }

  teardown () {
    this.listeners = {};
  }
}

class ClearX {
  constructor (data) {
    this.data = data;
    this.segments = [];
    this.dataObserver = new DataObserver(this);
    this.delimiter = '.';
    this.onUpdateEvents = [];
  }

  triggerEvents (key) {
    this.dataObserver.dataUpdatedAt(key);
  }

  executeUtil (key, [status, changed, value]) {
    if (changed) {
      this.triggerEvents(key);
    }
    this.executeOnUpdateEvents(changed, key);
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

  paths (keys, id) {
    const segment = new Segment(keys, id, this.delimiter, this, this.dataObserver);
    this.segments.push(segment);
    return segment
  }

  bind (options = {}) {
    const { to, afterUpdate, id, paths, dataTransformer } = options;
    let component = to;
    if (Array.isArray(component)) {
      component = to[1];
    }
    let segment;
    segment = component.__segment;
    if (segment) {
      return segment.link(to)
    }
    segment = this.paths(paths, id, this.delimiter);
    segment.onUpdate(afterUpdate);
    segment.dataTransformer(dataTransformer);
    const link = segment.link(to);

    if (Array.isArray(to)) {
      return link
    }
    return segment
  }

  removeSegment (segment) {
    const index = this.segments.indexOf(segment);
    if (index > -1) {
      segment.teardown();
      this.segments.splice(index, 1);
      return true
    }
    return false
  }

  onUpdate (func) {
    if (typeof func === 'function') {
      this.onUpdateEvents.push(func);
      return () => {
        const idx = this.onUpdateEvents.indexOf(func);
        if (idx > -1) this.onUpdateEvents.splice(idx, 1);
      }
    }
    return () => {}
  }

  executeOnUpdateEvents (changed, changedKeys) {
    this.onUpdateEvents.forEach((func) => {
      try {
        func(changed, changedKeys, this.data, this);
      } catch (ex) {
        console.log('onUpdate', func, changedKeys);
      }
    });
  }

  _unlinkComponentFromAllSegments (component) {
    this.segments.forEach((segment) => {
      segment.unlink(component);
    });
  }

  teardown () {
    this.segments.forEach((segment) => {
      segment.teardown();
    });
    this.dataObserver.teardown();
    delete this.dataObserver;
    this.data = {};
    return true
  }
}

exports.ClearX = ClearX;
//# sourceMappingURL=clearx.cjs.js.map
