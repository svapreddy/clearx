var obj = {
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: [{
                            a: {
                                b: [2]
                            }
                        }]
                    }
                }
            }
        }
    }
}

var get = (obj, keys, defaultValue) => {
    if (obj === undefined) return defaultValue
    if (!keys || keys.length === 0) return obj
    if (!Array.isArray(keys)) keys = keys.split(".")
    let [key, ...remaining] = keys
    if (!isNaN(key)) key *= 1
    return get(obj[key], remaining, defaultValue)
}

var set = (obj, keys, value) => {
    if (obj === undefined) return
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

console.log(get(obj, "a.b.c.d.e.f.0.a.b"), "a.b.c.d.e.f.0.a.b")

console.log(get(obj, "a.b.c.d.e.f.0.a.b.0"), "a.b.c.d.e.f.0.a.b.0")

console.log(get(obj, "a.b.c.d.e.f.1.a.b.0"), "a.b.c.d.e.f.1.a.b.0")

var newObj = {}

set(newObj, "a.b.c.d.0.0.0.0.0.0.0.a.b.0......", false)

console.log(get(newObj, "a.b.c.d.0.0.0.0.0.0.0.a.b.0"), "a.b.c.d.0.0.0.0.0.0.0.a.b.0")

console.log(newObj)

var toNumber = (val) => {
    if (!isNaN(val)) return val * 1
    return val
}

var split = (path, seperator) => {
    let keys = []
    let key = ""
    const escape = "\\"
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

split("a.b.c.0.0\\.0\\.0\\.0\\.0\\.0\\.0.a.b.0....", ".")