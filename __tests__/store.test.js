import store from './fixures/store'
import { exportAllDeclaration } from '@babel/types'

describe('Segments', () => {
    it ('Can create segment with plain path', () => {
        const segment = store.paths('test')
        expect(segment.data).toBe(1)
    })
    it ('Can create segment with array paths', () => {
        const segment = store.paths(['test', 'test'])
        expect(segment.data).toStrictEqual([1, 1])
    })
    it ('Can create segment using map fomat', () => {
        const segment = store.paths({a: 'test'})
        expect(segment.data).toStrictEqual({a: 1})
    })
})