import store from './fixures/store'

describe('Store', () => {

    it('executes onUpdate event', () => {
        const fn = jest.fn()
        store.onUpdate(fn)
        store.set('xyz', 1)
        expect(fn).toHaveBeenCalledWith(true, 'xyz', store.data, store)
        store.set('xyz', 1)
        expect(fn).toHaveBeenCalledWith(false, 'xyz', store.data, store)
    })

    describe('Segments', () => {

        describe('with sync off', () => {
            it('Can create segment with plain path', () => {
                const segment = store.paths('test')
                expect(segment.data).toBe(1)
            })
            it('Can create segment with array paths', () => {
                const segment = store.paths(['test', 'test'])
                expect(segment.data).toStrictEqual([1, 1])
            })
            it('Can create segment using map fomat', () => {
                const segment = store.paths({
                    a: 'test'
                })
                expect(segment.data).toStrictEqual({
                    a: 1
                })
            })

        })
        describe('with sync on', () => {
            it('Can create segment with plain path', () => {
                const segment = store.paths('test')
                segment.sync()
                expect(segment.data).toBe(1)
                store.set('test', 2)
                expect(segment.data).toBe(2)
            })
            it('Can create segment with array paths', () => {
                const segment = store.paths(['test', 'test'])
                segment.sync()
                expect(segment.data).toStrictEqual([2, 2])
                store.set('test', 3)
                expect(segment.data).toStrictEqual([3, 3])
            })
            it('Can create segment using map fomat', () => {
                const segment = store.paths({
                    a: 'test'
                })
                segment.sync()
                expect(segment.data).toStrictEqual({
                    a: 3
                })
                store.set('test', 1)
                expect(segment.data).toStrictEqual({
                    a: 1
                })
            })
        })
    })

})