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

export const noop = function () {}

export const isReactFamilyComponent = (Component : any) : boolean => {
    if (!Component) return false
    const isFunctionalComponent = (typeof Component === 'function') && Component.prototype && Component.prototype.isReactComponent
    const isClassComponent = Component.isReactComponent || ((typeof Component.setState === 'function') && (typeof Component.render === 'function'))
    return isFunctionalComponent || isClassComponent
}

// Borrowed from https://github.com/sindresorhus/dot-prop
export const getPathSegments = (path: keypath): (number | string)[] => {
    if (Array.isArray(path)) return path
	const pathArray: string[] = path.split('.')
    const parts: (number | string)[] = []
    
	for (let i = 0; i < pathArray.length; i++) {
		let p = pathArray[i]
		while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.'
			p += pathArray[++i]
		}
		parts.push(p)
	}

	return parts
}
