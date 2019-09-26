export type keypath = string | (number | string)[]

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

export const noop = function () { }

export const isReactFamilyComponent = (Component: any): boolean => {
    if (!Component) return false
    const isFunctionalComponent = (typeof Component === 'function') && Component.prototype && Component.prototype.isReactComponent
    const isClassComponent = Component.isReactComponent || ((typeof Component.setState === 'function') && (typeof Component.render === 'function'))
    return isFunctionalComponent || isClassComponent
}
