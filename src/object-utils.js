import {
  arrayMethods
} from './types'
import deepmerge from 'deepmerge'
import equal from 'fast-deep-equal'

const toNumber = (val) => {
  if (!isNaN(val)) {
    return parseInt(val, 10)
  }
  return val
}

const assign = (obj, key, val) => {
  if (hasEqual(obj[key], val)) return false
  obj[key] = val
  return obj[key] === val
}

export const hasEqual = (obj1, obj2) => {
  return typeof obj1 !== undefined && equal(obj1, obj2)
}

export const split = (path, seperator = '.', escape = '\\') => {
  if (!path) return []
  if (Array.isArray(path)) return path
  let keys = []
  let key = ''
  for (let i = 0, l = path.length; i < l; ++i) {
    let charKey = path[i]
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
  let [key, next, ...remaining] = keys
  if (next) {
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
  if (value === undefined || value === null) return false
  return true
}

export const ensureExists = (obj, keys, value) => {
  return set(obj, keys, value, true)
}

export const arrayOps = (obj, keys, method, ...args) => {
  let arr = get(obj, keys)
  if (!Array.isArray(arr)) {
    arr = []
    set(obj, keys, arr)
  }
  const origLength = arr.length
  arr[method].apply(arr, args)
  return [true, arr.length !== origLength]
}

export const insert = (obj, keys, value, at) => {
  return arrayOps(obj, keys, arrayMethods.splice, at, 0, value)
}

export const push = (obj, keys, ...values) => {
  return arrayOps(obj, keys, arrayMethods.push, ...values)
}

export const unshift = (obj, keys, ...args) => {
  return arrayOps(obj, keys, arrayMethods.unshift, ...args)
}

export const pop = (obj, keys) => {
  return arrayOps(obj, keys, arrayMethods.pop)
}

export const shift = (obj, keys) => {
  return arrayOps(obj, keys, arrayMethods.shift)
}

export const splice = (obj, keys, ...args) => {
  return arrayOps(obj, keys, arrayMethods.unshift, ...args)
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
      break
    case typeof value === 'object':
      for (let i in value) {
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
    if (val !== undefined) {
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
  let [key, ...remaining] = keys
  if (keys.length === 1) {
    if (Array.isArray(obj) && !isNaN(key)) {
      isDataUpdated = splice(obj, key, 1)
    } else if (obj.hasOwnProperty(key)) {
      isDataUpdated = delete obj[key]
    }
    return [true, isDataUpdated]
  } else {
    return del(obj[key], [...remaining])
  }
}

export const merge = (obj, keys, data) => {
  return set(obj, keys, deepmerge(get(obj, keys), data))
}