import { isReactFamilyComponent } from './utils'
import { segmentOptions, keypath, SegmentIF, ClearXIF, paths, clearxOptions } from './types'
import { get, set, coalesce, empty, insert, push, pop, shift, splice, ensureExists, del, has, merge } from './object-utils'
import split from 'ramda/es/split'

class DataObserver {
    constructor() { }
    attachObserver(keys: keypath[]): void { }
    detachObserver(segment: Segment): void { }
    destroy(): void { }
}

class Segment implements SegmentIF {

    public readonly isBoundToReactComponent: boolean
    public readonly active: boolean
    private componentWillUnmount: any
    private detachListeners: Function = () => { }
    private keySeperator: string = "."

    constructor(private config: segmentOptions, private store: Clearx, private dataObserver: DataObserver) {
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
        let paths: paths = this.config.paths
        for (const key in paths) {
            if (paths.hasOwnProperty(key)) {
                let path = paths[key]
                if (!path) continue
                path = split()
                paths[key] = path
            }
        }
    }

    private listenDataChanges(): CallableFunction {
        let listeningKeys: keypath[] = []
        const paths = this.config.paths
        for (const key in paths) {
            listeningKeys[listeningKeys.length] = paths[key]
        }
        this.dataObserver.attachObserver(listeningKeys)

        return () => {
            this.dataObserver.detachObserver(this)
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

class Clearx implements ClearXIF {
    public readonly segments: Segment[] = []
    private readonly dataObserver: DataObserver
    private readonly keySeperator: string
    constructor(public data: object, { keySeperator = "." }: clearxOptions) {
        this.dataObserver = new DataObserver()
        this.keySeperator = keySeperator
    }
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
    public bind(options: segmentOptions): Segment {
        const segment: Segment = new Segment({
            keySeperator: this.keySeperator
            ...options
        }, this, this.dataObserver)
        this.segments.push(segment)
        return segment
    }
    public destroy() {
        this.segments.forEach((segment: Segment) => {
            segment.destroy()
        })
        this.dataObserver.destroy()
        this.data = {}
    }
}
