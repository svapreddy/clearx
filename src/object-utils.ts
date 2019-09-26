export const toNumber = (val: any): number | string => {
    if (!isNaN(val)) return val * 1
    return val
}

export const split = (path: string | any[], seperator: string = ".", escape: string = "\\") => {
    let keys = []
    let key = ""
    for (let i = 0; i < path.length; i++) {
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

export const get = (obj: any, keys: (string | any[]), defaultValue: any): any => {
    if (obj === undefined) return defaultValue
    if (!keys || keys.length === 0) return obj
    if (!Array.isArray(keys)) keys = keys.split(".")
    let [key, ...remaining] = keys
    if (!isNaN(key)) key *= 1
    return get(obj[key], remaining, defaultValue)
}

export const set = (obj: any, keys: (string | any[]), value: any): boolean => {
    if (obj === undefined) return false
    if (!keys || keys.length === 0) return true
    if (!Array.isArray(keys)) keys = keys.split(".")
    let [key, next, ...remaining] = keys
    if (next) {
        obj[key] = !isNaN(next) ? [] : {}
        return set(obj[key], [next, ...remaining], value)
    } else {
        obj[key] = value
    }
    return true
}