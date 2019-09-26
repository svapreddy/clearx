export const noop = function () { }

export const isReactFamilyComponent = (Component: any): boolean => {
    if (!Component) return false
    const isFunctionalComponent = (typeof Component === 'function') && Component.prototype && Component.prototype.isReactComponent
    const isClassComponent = Component.isReactComponent || ((typeof Component.setState === 'function') && (typeof Component.render === 'function'))
    return isFunctionalComponent || isClassComponent
}
