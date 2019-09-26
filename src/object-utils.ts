import { keypath, arrayMethods } from './types'
import deepmerge from 'deepmerge'
import equal from 'fast-deep-equal'

const toNumber = (val: any): number | string => {
    if (!isNaN(val)) return val * 1
    return val
}

export const split = (path: keypath, seperator: string = ".", escape: string = "\\") => {
    if (!path) return []
    if (Array.isArray(path)) return path
    let keys = []
    let key = ""
    for (let i = 0, l = path.length; i < l; ++i) {
        let charKey = path[i]
        if ((charKey === seperator) && (path[i - 1] !== escape)) {
            if (key.length > 0) keys.push(toNumber(key))
            key = ""
        } else {
            if (charKey !== escape) key += path[i]
        }
    }
    if (key.length > 0) keys.push(toNumber(key))
    return keys
}

export const get = (obj: any, keys: (keypath), defaultValue?: any): any => {
    if (obj === undefined) return defaultValue
    if (!keys || keys.length === 0) return obj
    keys = split(keys)
    let [key, ...remaining] = keys
    if (!isNaN(key)) key *= 1
    return get(obj[key], remaining, defaultValue)
}

export const set = (obj: any, keys: (keypath), value: any, dontReplace?: boolean): boolean => {
    if (obj === undefined) return false
    if (!keys || keys.length === 0) return true
    keys = split(keys)
    let [key, next, ...remaining] = keys
    if (next) {
        obj[key] = !isNaN(next) ? [] : {}
        return set(obj[key], [next, ...remaining], value, dontReplace)
    } else {
        if (obj[key] && dontReplace) {
            return true
        }
        obj[key] = value
    }
    return true
}

export const has = (obj: any, keys: (keypath)) => {
    const value = get(obj, keys)
    if (value === undefined || value === null) return false
    return true
}

export const ensureExists = (obj: any, keys: (keypath), value: any) => {
    return set(obj, keys, value, true)
}

export const arrayOps = (obj: any, keys: keypath, method: arrayMethods, ...args: any[]): any => {
    let arr: any[] = get(obj, keys)
    if (!Array.isArray(arr)) {
        arr = []
        set(obj, keys, arr)
    }
    return arr[method].apply(arr, args)
}

export const insert = (obj: any, keys: keypath, value: any, at: number) => {
    return arrayOps(obj, keys, arrayMethods.splice, at, 0, value)
}

export const push = (obj: any, keys: keypath, ...values: any[]) => {
    return arrayOps(obj, keys, arrayMethods.push, ...values)
}

export const unshift = (obj: any, keys: keypath, ...args: any[]) => {
    return arrayOps(obj, keys, arrayMethods.unshift, ...args)
}

export const pop = (obj: any, keys: keypath) => {
    return arrayOps(obj, keys, arrayMethods.pop)
}

export const shift = (obj: any, keys: keypath) => {
    return arrayOps(obj, keys, arrayMethods.shift)
}

export const splice = (obj: any, keys: keypath, ...args: any[]) => {
    return arrayOps(obj, keys, arrayMethods.unshift, ...args)
}

export const empty = (obj: any, keys: keypath) => {
    const value = get(obj, keys)
    let finalValue
    switch (true) {
        case typeof value === "string":
            finalValue = ""
            break;
        case typeof value === "number":
            finalValue = 0
            break;
        case typeof value === "boolean":
            finalValue = false
            break;
        case Array.isArray(value):
            value.length = 0
            break;
        case typeof value === "object":
            for (let i in value) {
                if (value.hasOwnProperty(i)) {
                    delete value[i];
                }
            }
            break;
        default:
            finalValue = null
            break;
    }
    if (finalValue !== undefined) {
        set(obj, keys, finalValue)
    }
    return true
}

export const coalesce = (obj: any, keysArr: (keypath)[], defaultValue: any) => {
    for (let i = 0, l = keysArr.length; i < l; ++i) {
        const val = get(obj, keysArr[i])
        if (val !== undefined) return val
    }
    return defaultValue
}

export const del = (obj: any, keys: keypath): boolean => {
    if (obj === undefined) return false
    if (!keys || keys.length === 0) return true
    keys = split(keys)
    let [key, ...remaining] = keys
    if (keys.length === 1) {
        if (Array.isArray(obj) && !isNaN(key)) {
            obj[key].splice(key, 1)
        } else {
            delete obj[key]
        }
        return true
    } else {
        return del(obj[key], [...remaining])
    }
}

export const merge = (obj: any, keys: keypath, data: any): boolean => {
    ensureExists(obj, keys, {})
    let old = get(obj, keys)
    if (equal(old, data)) return false
    deepmerge(old, data)
    return true
}