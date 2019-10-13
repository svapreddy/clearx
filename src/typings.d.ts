import { JsonObject } from 'type-fest'
import React, { useState, Component } from 'react'
import { type } from 'os'

export as namespace ClearX
export = ClearX

type path = string
type pathList = Array<path>
type pathsMap = {
    [key: string]: path
}

type paths = path | pathList | pathsMap

type useStateReturnValue = ReturnType<typeof useState>
type targetComponent = useStateReturnValue | Component

type fnArr = Array<Function>
type unlink = Function
type fcReturnValue = [any, unlink]

type fcOptions = {
    to: useStateReturnValue,
    paths: paths,
    afterUpdate?: Function,
    dataTransformer?: Function
    id?:string
}

type ccOptions = {
    to: Component,
    paths: pathsMap,
    afterUpdate?: Function,
    dataTransformer?: Function
    id?:string
}

interface ISegment {
    readonly data: any,
    readonly components: Array<targetComponent>
    readonly active: boolean
    readonly afterUpdateEvents: fnArr
    readonly dataTransformers: fnArr
    readonly id: string
    findComponent(component: targetComponent): number
    link(component: targetComponent): fcReturnValue
    unlink(component: targetComponent): boolean
    sync(on?: boolean): boolean
    unlinkAll(): boolean
    onUpdate(fn: Function): unlink
    dataTransformer(fn: Function): unlink
    teardown(): boolean
}

declare class ClearX {
    constructor (data: JsonObject)
    get(key: path, defaultValue?: any): any
    set(key: path, value: any, doNotReplace?: boolean): boolean
    coalesce(keys: pathList, defaultValue?: any): any
    empty(key: path): boolean
    insert(key: path, args: any, position?: number): boolean
    push(key: path, ...args: any[]): boolean
    unshift(key: path, ...args: any[]): boolean
    pop(key: path): boolean
    shift(key: path): boolean
    splice(key: path, ...args: any[]): boolean
    slice(key: path, ...args: any[]): Array<any>
    sort(key: path, ...args: any[]): boolean
    ensureExists(key: path, defaultValue: any): boolean
    delete(key: path): boolean
    has(key: path): boolean
    merge(key: path, data: JsonObject): boolean
    increment (key: path, by?:number): boolean
    decrement (key: path, by?:number): boolean
    toggle (key: path): boolean
    isEqual (key: path, value?:any): boolean
    paths(key: paths, id?:string): ISegment
    bind(options: fcOptions): fcReturnValue
    bind(options: ccOptions): ISegment
    removeSegment (segment: ISegment): boolean
    onUpdate(fn: Function): unlink
    teardown(): boolean
}