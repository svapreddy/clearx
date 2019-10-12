export type keypath = string | any[]

type paths = {
    [key: string]: keypath
}

type events = {
    [key in 'afterUpdate']: Function
}

type withDefaultData = {
    [key: string]: any
}

type target = {
    componentWillUnmount?: Function
}

export interface segmentOptions {
    to: target
    paths: paths
    events?: events
    withDefaultData?: withDefaultData,
    delimiter: string
}

export enum arrayMethods {
    push,
    pop,
    splice,
    shift,
    unshift,
    sort
}

export interface SegmentIF {
    active: boolean
    data: object,
    isBoundToReactComponent: boolean
}

export interface ClearXIF {
    get(key: keypath, defaultValue: any): any
    set(key: keypath, value: any, doNotReplace: boolean): boolean
    coalesce(keys: keypath[], defaultValue: any): any
    empty(key: keypath): boolean
    insert(key: keypath, value: any, position: number): any
    push(key: keypath, ...values: any[]): any
    unshift(key: keypath, ...values: any[]): any
    pop(key: keypath): any
    shift(key: keypath): any
    splice(key: keypath, ...args: any[]): any
    ensureExists(key: keypath, defaultValue: any): boolean
    delete(key: keypath): boolean
    has(key: keypath): boolean
    merge(key: keypath, data: object): boolean
    bind(options: segmentOptions): SegmentIF
    destroy(): void
}

export interface DataObserverIF {
    attachObserver(keys: keypath[]): void
    detachObserver(segment: SegmentIF): void
    destroy(): void
}

export interface clearxOptions {
    delimiter?: string
}