import { JsonValue, JsonArray, JsonObject, Primitive } from 'type-fest'
import React, { useState, Component } from 'react'

type useStateReturnValue = ReturnType<typeof useState>

export interface componentWillUnmount extends Function {
    __original?: Function
}

export type targetComponent = useStateReturnValue | Component

export type targetComponents = Array<targetComponent>
export type fnArray = Array<Function>

export { JsonValue, JsonArray, JsonObject, Primitive }

export type pathAsString = string // "a.b.c.0.x.1"
export type pathAsArray = Array<string | number> // ["a", "b", "c", 0, "x", "1"]

export type pathAsStringList = Array<pathAsString>
export type pathAsArrayList = Array<pathAsArray>

export type keypathJsonObject = {
    [key: string]: pathAsString
}

export type paths = pathAsString | pathAsStringList | keypathJsonObject

export type delimiter = string

export interface IConfig {
    delimiter?: delimiter
}

export type dataObserverListeners = {
    [key: string]: {
        keys: pathAsArrayList,
        listener: Function
    }
}

export interface IDataObserver {
    attachObserver(keys: pathAsArrayList, listener: Function): Function | undefined
    dataUpdatedAt(path: pathAsString | pathAsArray): void
    teardown(): void
}

export interface ISegmentHelper {
    components: Array<targetComponent>
    data: any
    hasDataListener: boolean
    afterUpdateEvents: Array<Function>
    observe(force: boolean): void
    unobserve(): void
    listenUnmount(component: targetComponent, onUnmount: Function)
    unlistenUnmount(component: targetComponent)
    applyDataTransformers(data: any)
    updateData(),
    updateComponents(),
    onUpdate(fn: Function): void
    dataTransformer(fn: Function): void
}

export interface ISegment {
    findComponent(component: targetComponent): number
    link(component: targetComponent): any
    unlink(component: targetComponent): any
    sync(on?: boolean): boolean
    unlinkAll(): void
    onUpdate(fn: Function): void
    dataTransformer(fn: Function): void
    teardown(): boolean
}

export interface IClearX {
    get(key: pathAsString, defaultValue: any): any
    set(key: pathAsString, value: any, doNotReplace: boolean): boolean
    coalesce(keys: pathAsStringList, defaultValue: any): any
    empty(key: pathAsString): boolean
    insert(key: pathAsString, value: any, position: number): any
    push(key: pathAsString, ...values: any[]): any
    unshift(key: pathAsString, ...values: any[]): any
    pop(key: pathAsString): any
    shift(key: pathAsString): any
    splice(key: pathAsString, ...args: any[]): any
    ensureExists(key: pathAsString, defaultValue: any): boolean
    delete(key: pathAsString): boolean
    has(key: pathAsString): boolean
    merge(key: pathAsString, data: object): boolean
    bind(options: any): ISegment
    destroy(): void
}