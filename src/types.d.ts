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

export interface options {
    events?: events
    to: target
    withDefaultData?: withDefaultData
    paths: paths
}

export enum arrayMethods {
    push,
    pop,
    splice,
    shift,
    unshift,
    sort
}