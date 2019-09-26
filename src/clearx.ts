import { isReactFamilyComponent } from './utils'
import { options, keypath } from './types'
import { get, set, coalesce, empty, insert, push, pop, shift, splice, ensureExists, del, has, merge } from './object-utils'

class Handler {
    constructor() { }
    attachObserver(keys: keypath[]): void { }
    detachObserver(segment: Segment): void { }
}

class Segment {

    public readonly isBoundToReactComponent: boolean
    public readonly active: boolean
    private componentWillUnmount: any
    private detachListeners: Function = () => { }

    constructor(private config: options, private store: Clearx, private handler: Handler) {
        this.isBoundToReactComponent = isReactFamilyComponent(config.to)
        this.bootstrap()
        this.active = true
    }

    private attachListeners(): Function {
        const dataChanges = this.listenDataChanges()
        const unmountHook = this.listenUnmount()
        return () => {
            dataChanges()
            unmountHook()
        }
    }

    private normalizePaths(): void {
        let listeningKeys: keypath[] = []
        let paths = this.config.paths
        for (const key in paths) {
            let path = paths[key]
            if (!path) continue
            if (typeof path === 'string') {
                path = getPathSegments(path)
            }
            paths[key] = path
        }
    }

    private listenDataChanges(): CallableFunction {
        let listeningKeys: keypath[] = []
        const paths = this.config.paths
        for (const key in paths) {
            listeningKeys[listeningKeys.length] = paths[key]
        }
        this.handler.attachObserver(listeningKeys)

        return () => {
            this.handler.detachObserver(this)
        }
    }

    private listenUnmount(): CallableFunction {
        if (!this.isBoundToReactComponent) return () => { }
        const target = this.config.to
        this.componentWillUnmount = target.componentWillUnmount
        target.componentWillUnmount = pipe(() => {
            this.destroy()
        }, () => {
            if (this.componentWillUnmount) {
                this.componentWillUnmount.call(target)
            }
        })
        return () => {
            target.componentWillUnmount = this.componentWillUnmount
            delete this.componentWillUnmount
        }
    }

    get data(): object {
        let segment: {
            [key: string]: any
        } = {}
        let defaultValues = this.config.withDefaultData || {}
        const paths = this.config.paths
        for (const key in paths) {
            segment[key] = this.store.get(paths[key]) || defaultValues[key]
        }
        return segment
    }

    private assignState(): void {
        let data = this.data
    }

    private bootstrap(): void {
        this.normalizePaths()
        this.detachListeners = this.attachListeners()
        this.assignState()
    }

    public destroy(): void {
        this.detachListeners()
    }
}

class Clearx {
    public readonly segments: Segment[] = []
    constructor(public readonly data: object) { }
    public get(key: keypath, defaultValue: any): any {
        return get(this.data, key, defaultValue)
    }
    public set(key: keypath, value: any, doNotReplace: boolean = false): boolean {
        return set(this.data, key, value, doNotReplace)
    }
    public coalesce(keys: keypath[], defaultValue: any): any {
        return coalesce(this.data, keys, defaultValue)
    }
    public empty(key: keypath): boolean {
        return empty(this.data, key)
    }
    public insert(key: keypath, value: any, position: number): any {
        return insert(this.data, key, value, position)
    }
    public push(key: keypath, ...values: any[]): any {
        return push(this.data, key, ...values)
    }
    public unshift(key: keypath, ...values: any[]): any {
        return push(this.data, key, ...values)
    }
    public pop(key: keypath): any {
        return pop(this.data, key)
    }
    public shift(key: keypath): any {
        return shift(this.data, key)
    }
    public splice(key: keypath, ...args: any[]): any {
        return splice(this.data, key, ...args)
    }
    public ensureExists(key: keypath, defaultValue: any): boolean {
        return ensureExists(this.data, key, defaultValue)
    }
    public delete(key: keypath): boolean {
        return del(this.data, key)
    }
    public has(key: keypath): boolean {
        return has(this.data, key)
    }
    public merge(key: keypath, data: object): boolean {
        return merge(this.data, key, data)
    }
    public bind(): Segment {
        const opts: options = {
            to: {},
            paths: {}
        }
        const segment = new Segment(opts, this, new Handler())
        return segment
    }
    public destroy() { }
}


// import objectpath from 'object-path'
// import deepmerge from 'deepmerge'
// import equal from 'fast-deep-equal'

// import Handler from './handler'
// import Slice from './slice'

// let dataCollection = {}

// export default class Store {
//   constructor (data) {
//     this.count = 0
//     this.id = this.nextId
//     this.slicers = {}
//     this.handler = new Handler(this)
//     dataCollection[this.id] = data
//   }
//   get nextId () {
//     this.count += 1
//     return Date.now() + this.count + ''
//   }
//   get localStores () {
//     return this.slicers
//   }
//   get data () {
//     return dataCollection[this.id]
//   }
//   // set values
//   set (key, value) {
//     let old = this.get(key)
//     // if has same value, do not set
//     if (old && equal(old, value)) return
//     objectpath.set(this.data, key, value)
//     this.handler.changed([key])
//   }
//   // get deep property
//   get (key, defaultValue) {
//     return objectpath.get(this.data, key, defaultValue)
//   }
//   // get the first non-undefined value
//   coalesce (keys, defaultValue) {
//     return objectpath.coalesce(this.data, keys, defaultValue)
//   }
//   // empty a given path (but do not delete it) depending on their type,so it retains reference to objects and arrays.
//   empty (key) {
//     objectpath.empty(this.data, key)
//     this.handler.changed([key])
//   }
//   // will insert values in array at given position
//   insert (key, value, position) {
//     objectpath.insert(this.data, key, value, position)
//     this.handler.changed([key])
//   }
//   // push into arrays (and create intermediate objects/arrays)
//   push (key /*, values */) {
//     let args = [this.data, key]
//     args.push.apply(args, Array.prototype.slice.call(arguments, 1))
//     objectpath.push.apply(objectpath, args)
//     this.handler.changed([key])
//   }
//   // ensure a path exists (if it doesn't, set the default value you provide)
//   ensureExists (key, defaultValue) {
//     let exists = this.has(key)
//     if (!exists) {
//       objectpath.ensureExists(this.data, key, defaultValue)
//       this.handler.changed([key])
//     }
//   }
//   // deletes a path
//   del (key) {
//     objectpath.del(this.data, key)
//     this.handler.changed([key])
//   }
//   // tests path existence
//   has (key) {
//     return objectpath.has(this.data, key)
//   }
//   // Merge data from another Object
//   merge (key, data, options) {
//     if (!key || !data) return
//     let old = this.get(key)
//     if (equal(old, data)) return
//     this.set(key, deepmerge(old, data))
//   }
//   // For React components: Extracts the data from the store. This slice will be in sync with the initial global data set
//   slice (map, context, config = {}) {
//     let options = {
//       to: context,
//       paths: map,
//       withDefaultData: config.defaults,
//       events: {
//         afterUpdate: config.updateCallback
//       },
//       isReactFamilyUIComponent: config.reactLike
//     }
//     return this.bind(options)
//   }
//   bind (options = {}) {
//     let instance = new Slice(options, this, this.handler)
//     this.slicers[instance.id] = instance
//     return this.slicers[instance.id]
//   }
//   destroy () {
//     for (let id in this.slicers) {
//       this.slicers[id].destroy()
//     }
//     this.handler.destroy()
//     this.slicers = {}
//     this.handler = null
//     delete dataCollection[this.id]
//   }
// }
