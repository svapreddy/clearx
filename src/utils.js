export const noop = function () { };

export const functionComponent = (Component) => {
    return Component && (typeof Component === 'function')
}

export const classComponent = (Component) => {
    const hasRender = typeof Component.setState === 'function' && typeof Component.render === 'function'
    return Component && (Component.isReactComponent && hasRender)
}

export const isReactFamilyComponent = (Component) => {
    return classComponent(Component) || functionComponent(Component)
};

const Component = (props) => {
    const { data } = props
    return <div>
        { val }
    </div>
}

return Store.bind(Component)