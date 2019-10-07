import deepmerge from 'deepmerge'
import equal from 'fast-deep-equal'

const toNumber = (val) => {
  if (!isNaN(val)) {
    return val * 1
  }
  return val
}

const assign = (obj, key, val) => {
  if (hasEqual(obj[key], val)) return false
  obj[key] = val
  return obj[key] === val
}

export const freezeObject = (obj) => {
  if (Object.freeze) Object.freeze(obj)
  return obj
}

export const hasEqual = (obj1, obj2) => {
  return obj1 !== undefined && equal(obj1, obj2)
}

export const split = (path, seperator = '.', escape = '\\') => {
  if (!path) return []
  if (Array.isArray(path)) return path
  const keys = []
  let key = ''
  for (let i = 0, l = path.length; i < l; ++i) {
    const charKey = path[i]
    if ((charKey === seperator) && (path[i - 1] !== escape)) {
      if (key.length > 0) {
        keys.push(toNumber(key))
      }
      key = ''
    } else {
      if (charKey !== escape) {
        key += path[i]
      }
    }
  }
  if (key.length > 0) {
    keys.push(toNumber(key))
  }
  return keys
}

export const get = (obj, keys, defaultValue) => {
  if (obj === undefined) return defaultValue
  if (!keys || keys.length === 0) {
    return obj
  }
  keys = split(keys)
  let [key, ...remaining] = keys
  if (!isNaN(key)) {
    key *= 1
  }
  return get(obj[key], remaining, defaultValue)
}

export const set = (obj, keys, value, dontReplace) => {
  let isDataUpdated = false

  if (obj === undefined) return [false, isDataUpdated]
  if (!keys || keys.length === 0) return [false, isDataUpdated]

  keys = split(keys)
  const [key, next, ...remaining] = keys
  if (next !== undefined) {
    if (!obj.hasOwnProperty(key)) {
      const val = !isNaN(next) ? [] : {}
      isDataUpdated = assign(obj, key, val)
    }
    const [_, __] = set(obj[key], [next, ...remaining], value, dontReplace)
    return [_, __ || isDataUpdated]
  } else {
    if (obj.hasOwnProperty(key) && dontReplace) return [true, isDataUpdated]
    isDataUpdated = assign(obj, key, value)
    return [true, isDataUpdated]
  }
}

export const has = (obj, keys) => {
  const value = get(obj, keys)
  if (value === undefined) return false
  return true
}

export const ensureExists = (obj, keys, value = null) => {
  return set(obj, keys, value, true)
}

const arrayMethods = ['push', 'pop', 'splice', 'shift', 'unshift', 'sort', 'slice']

export const arrayOps = (obj, keys, method, ...args) => {
  if (arrayMethods.indexOf(method) === -1) return false
  let arr = get(obj, keys)
  if (!Array.isArray(arr)) {
    arr = []
    set(obj, keys, arr)
  }
  let val
  try {
    val = arr[method].apply(arr, args)
  } catch (ex) {
    // Probably freeze!
  }
  return [true, true, val]
}

export const push = (obj, keys, ...values) => {
  return arrayOps(obj, keys, 'push', ...values)
}

export const insert = (obj, keys, value, at) => {
  if (at === undefined) {
    return push(obj, keys, value)
  }
  return arrayOps(obj, keys, 'splice', at, 0, value)
}

export const unshift = (obj, keys, ...args) => {
  return arrayOps(obj, keys, 'unshift', ...args)
}

export const pop = (obj, keys) => {
  return arrayOps(obj, keys, 'pop')
}

export const shift = (obj, keys) => {
  return arrayOps(obj, keys, 'shift')
}

export const splice = (obj, keys, ...args) => {
  return arrayOps(obj, keys, 'splice', ...args)
}

export const slice = (obj, keys, ...args) => {
  const result = arrayOps(obj, keys, 'slice', ...args)
  return result[2]
}

export const sort = (obj, keys, ...args) => {
  return arrayOps(obj, keys, 'sort', ...args)
}

export const increment = (obj, keys, by = 1) => {
  let val = get(obj, keys) * 1
  if (isNaN(val)) {
    val = 0
  }
  val += by
  return set(obj, keys, val)
}

export const decrement = (obj, keys, by = 1) => {
  return increment(obj, keys, by * -1)
}

export const toggle = (obj, keys) => {
  const existing = !!get(obj, keys)
  return set(obj, keys, !existing)
}

export const empty = (obj, keys) => {
  let isDataUpdated = false
  const value = get(obj, keys)
  if (value === undefined) return [true, isDataUpdated]
  let finalValue
  switch (true) {
    case typeof value === 'string':
      finalValue = ''
      break
    case typeof value === 'number':
      finalValue = 0
      break
    case typeof value === 'boolean':
      finalValue = false
      break
    case Array.isArray(value):
      value.length = 0
      return [true, value.length === 0]
    case typeof value === 'object':
      for (const i in value) {
        if (value.hasOwnProperty(i)) {
          isDataUpdated = delete value[i] || isDataUpdated
        }
      }
      return [true, isDataUpdated]
  }
  return set(obj, keys, finalValue)
}

export const coalesce = (obj, keysArr, defaultValue) => {
  for (let i = 0, l = keysArr.length; i < l; ++i) {
    const val = get(obj, keysArr[i])
    if (val !== undefined && val !== null) {
      return val
    }
  }
  return defaultValue
}

export const del = (obj, keys) => {
  let isDataUpdated = false
  if (obj === undefined) return [false, isDataUpdated]
  if (!keys || keys.length === 0) return [false, isDataUpdated]
  keys = split(keys)
  const [key, ...remaining] = keys
  if (keys.length === 1) {
    if (Array.isArray(obj) && !isNaN(key)) {
      const len = obj.length
      obj.splice(key, 1)
      isDataUpdated = len !== obj.length
    } else if (obj.hasOwnProperty(key)) {
      isDataUpdated = delete obj[key]
    }
    return [true, isDataUpdated]
  } else {
    return del(obj[key], [...remaining])
  }
}

export const merge = (obj, keys, data) => {
  ensureExists(obj, keys, Array.isArray(data) ? [] : {})
  const current = get(obj, keys)
  const merged = deepmerge(current, data)
  return set(obj, keys, merged)
}

export const isEqual = (obj, keys, data) => {
  const current = get(obj, keys)
  return equal(current, data)
}
