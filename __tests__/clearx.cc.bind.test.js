import React from 'react'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import store from './fixures/store'
import Component from './fixures/cc-comp-bind'

describe('Class Component using bind', () => {
  let rendered, segment, component

  beforeEach(() => {
    rendered = render(<Component />)
    segment = store.segments[store.segments.length - 1]
    component = segment.components[segment.components.length - 1]
  })

  afterEach(() => {
    segment.teardown()
  })

  afterAll(() => {
    store.teardown()
    expect(store.segments.length).toBe(0)
  })

  describe('Component receives the data from store', () => {
    
    describe('internals', () => {
      it('should not observe data changes', () => {
        expect(segment.active).toBe(true)
      })
      
      it('component is stored', () => {
        expect(component.__segment).toBe(segment)
        expect(segment.findComponent(component)).toBe(0)
      })

      it('when same component is linked to same segment, it should not duplicate segment', () => {
        let data, unlink
        act(() => {
          [data, unlink] = segment.link(component)
        })
        expect(store.segments.length).toBe(1)
        expect(segment.data).toBe(data)
      })

      it('segment has components array', () => {
        expect(segment.components).toStrictEqual([component])
      })

      it('runs onUpdate callback', () => {
        const fn = jest.fn()
        segment.onUpdate(fn)
        act(() => {
          store.set('test', 2)
        })
        expect(fn).toHaveBeenCalled()
      })

      it('runs data transformer callback', () => {
        const fn = (data) => {
          data.test *= 100
          return data
        }
        act(() => {
          segment.dataTransformer(fn)
          segment.link(component)
        })
        const [data, unlink] = segment.link(component)
        expect(data.test).toBe(200)
      })

      it('when unlinked, component should be removed from segment', () => {
        const [data, unlink] = segment.link(component)
        act(() => {
          unlink()
        })
        expect(component.__segment).toBe(undefined)
        expect(segment.findComponent(component)).toBe(-1)
      })
      it('if segment does not have any components, should not observe changes', () => {
        const [data, unlink] = segment.link(component)
        act(() => {
          unlink()
        })
        expect(segment.active).toBe(false)
      })

    })

    describe('#get', () => {
      it('has name displayed', () => {
        expect(rendered.getByTestId('name').textContent).toBe('test')
      })
      it('has counter displayed', () => {
        expect(rendered.getByTestId('counter').textContent).toBe('')
      })
      it('has keyWithDot displayed', () => {
        expect(rendered.getByTestId('keyWithDot').textContent).toBe('key with dots value')
      })
      it('when tried to access key which does not exist. Should return undefined', () => {
        expect(store.get('it.does.not.exist')).toBe(undefined)
      })
    })

    describe('#toggle', () => {
      it('should toggle boolean value', () => {
        expect(rendered.getByTestId('active').textContent).toBe('true')
        act(() => {
          store.toggle('profile.active')
        })
        expect(rendered.getByTestId('active').textContent).toBe('false')
      })
      it('if called on non existen key, should set true', () => {
        act(() => {
          store.toggle('profile.non')
        })
        expect(store.get('profile.non')).toBe(true)
      })
    })

    describe('#coalesce', () => {
      it('should return first defined value', () => {
        expect(store.coalesce(['profile.age', 'profile.name'])).toBe('test')
      })
    })

    describe('#has', () => {
      it ('profile.age should not exist', () => {
        expect(store.has('profile.age')).toBe(false)
        expect(rendered.getByTestId('age').textContent).toBe('')
      })
    })

    describe('#ensureExists', () => {
      it ('profile.age should be created with value null', () => {
        act(() => {
          store.ensureExists('profile.age')
        })
        expect(store.get('profile.age')).toBe(null)
      })

      describe('#has', () => {
        it ('profile.age should exist', () => {
          expect(store.has('profile.age')).toBe(true)
          expect(rendered.getByTestId('age').textContent).toBe('')
        })
      })

      describe('#coalesce', () => {
        it('still return `test`', () => {
          expect(store.coalesce(['profile.age', 'profile.name'])).toBe("test")
        })
      })

      describe('#set', () => {
        it ('profile.age should be set to 30', () => {
          act(() => {
            store.set('profile.age', 30)
          })
          expect(rendered.getByTestId('age').textContent).toBe('30')
        })
      })

      describe('#coalesce', () => {
        it('should return first defined value age: 30', () => {
          expect(store.coalesce(['profile.age', 'profile.name'])).toBe(30)
        })
      })
    })

    describe('#empty', () => {
      it('profile.lastName should become empty "" on empty', () => {
        const temp = "last name"
        act(() => {
          store.set('profile.lastName', temp)
        })
        expect(rendered.getByTestId('last-name').textContent).toBe(temp)
        act(() => {
          store.empty('profile.lastName')
        })
        expect(rendered.getByTestId('last-name').textContent).toBe('')
      })
      it ('profile.age should be 0 on empty', () => {
        act(() => {
          store.empty('profile.age')
        })
        expect(rendered.getByTestId('age').textContent).toBe('0')
      })
      it ('profile.active should be false on empty', () => {
        act(() => {
          store.empty('profile.active')
        })
        expect(rendered.getByTestId('active').textContent).toBe('false')
      })
      it('profile.testArr should become empty array on empty', () => {
        expect(rendered.getByTestId('test-arr').textContent).toBe('3 4')
        act(() => {
          store.empty('profile.testArr')
        })
        expect(rendered.getByTestId('test-arr').textContent).toBe('')
      })
      it('profile.testObject should become empty {} on empty', () => {
        const temp = { a: 1}
        act(() => {
          store.set('profile.testObj', temp)
        })
        expect(rendered.getByTestId('test-obj').textContent).toBe(JSON.stringify(temp))
        act(() => {
          store.empty('profile.testObj')
        })
        expect(rendered.getByTestId('test-obj').textContent).toBe('{}')
      })
    })

    describe('#set', () => {
      it('when name is changed should reflect new value', () => {
        const newValue = 'new-value'
        act(() => {
          store.set('profile.name', newValue)
        })
        expect(rendered.getByTestId('name').textContent).toBe(newValue)
      })

      it('should create non existing key', () => {
        act(() => {
          store.set('a.b.c.d.e.f.e', 'test')
        })
        expect(store.get('a.b.c.d.e.f.e')).toBe('test')
      })

      it('should create non existing key and array if key has number ', () => {
        act(() => {
          store.set('a.b.c.d.e.f.x.0', 'test')
        })
        expect(store.get('a.b.c.d.e.f.x')).toStrictEqual(['test'])
      })
    })

    describe('#increment', () => {
      it('has counter displayed', () => {
        expect(rendered.getByTestId('counter').textContent).toBe('')
      })
      it('increment by 1', () => {
        act(() => {
          store.increment('profile.counter')
        })
        expect(rendered.getByTestId('counter').textContent).toBe('1')
      })
      it('increment by 10', () => {
        act(() => {
          store.increment('profile.counter', 10)
        })
        expect(rendered.getByTestId('counter').textContent).toBe('11')
      })
    })

    describe('#decrement', () => {
      it('decrement by 10', () => {
        act(() => {
          store.decrement('profile.counter', 10)
        })
        expect(rendered.getByTestId('counter').textContent).toBe('1')
      })
      it('decrement by 1', () => {
        act(() => {
          store.decrement('profile.counter')
        })
        expect(rendered.getByTestId('counter').textContent).toBe('0')
      })
    })

    describe('#insert', () => {
      it ('should insert value at position', () => {
        expect(rendered.getByTestId('numbers').textContent).toBe('1 2 3')
        act(() => {
          store.insert('nums', -1, 0)
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('-1 1 2 3')
      })
      it('position is not provided, inserts at the end', () => {
        act(() => {
          store.insert('nums', -10)
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('-1 1 2 3 -10')
      })
    })

    describe('#push', () => {
      it ('should insert value at the end', () => {
        act(() => {
          store.push('nums', 100)
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('-1 1 2 3 -10 100')
      })
    })

    describe('#unshift', () => {
      it ('should insert value at the start', () => {
        act(() => {
          store.unshift('nums', 100)
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('100 -1 1 2 3 -10 100')
      })
    })

    describe('#pop', () => {
      it ('should remove value at the end', () => {
        act(() => {
          store.pop('nums')
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('100 -1 1 2 3 -10')
      })
    })

    describe('#shift', () => {
      it ('should remove value at the start', () => {
        act(() => {
          store.shift('nums')
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('-1 1 2 3 -10')
      })
    })

    describe('#splice', () => {
      it('remove at index', () => {
        act(() => {
          store.splice('nums', 2, 1)
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('-1 1 3 -10')
      })
      it('insert at index', () => {
        act(() => {
          store.splice('nums', 2, 0, 100)
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('-1 1 100 3 -10')
      })
    })

    describe('#sort', () => {
      
      it('should sort', () => {
        act(() => {
          store.set('names', ['def', 'abc'])
        })
        expect(rendered.getByTestId('names').textContent).toBe('def abc')
        act(() => {
          store.sort('names')
        })
        expect(rendered.getByTestId('names').textContent).toBe('abc def')
      })

      it('should accept compare function', () => {
        act(() => {
          store.sort('nums', (a, b) => { return a - b })
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('-10 -1 1 3 100')
        act(() => {
          store.sort('nums', (a, b) => { return b - a })
        })
        expect(rendered.getByTestId('numbers').textContent).toBe('100 3 1 -1 -10')
      })
    })

    describe('#slice', () => {
      it('should return subarray', () => {
        act(() => {
          store.set('test-a', [1, 2, 3, 4, 5])
        })
        expect(store.slice('test-a', 0, 2)).toStrictEqual([1, 2])
      })
    })

    describe('#delete', () => {
      it('if array index, removes that index', () => {
        expect(rendered.getByTestId('names').textContent).toBe('abc def')
        act(() => {
          store.delete('names.2')
        })
        expect(rendered.getByTestId('names').textContent).toBe('abc def')
        act(() => {
          store.delete('names.1')
        })
        expect(rendered.getByTestId('names').textContent).toBe('abc')
      })
      it('removes the key otherwise', () => {
        act(() => {
          store.delete('names')
        })
        expect(rendered.getByTestId('names').textContent).toBe('')
      })
    })

    describe('#merge', () => {
      it('should merge the objects', () => {
        act(() => {
          store.merge('test-obj', {
            a: 1,
            b: 5,
            c: 2
          })
        })
        expect(store.get('test-obj.b')).toBe(5)
        expect(store.get('test-obj.c')).toBe(2)
        act(() => {
          store.merge('test-obj', {
            a: 10
          })
        })
        expect(store.get('test-obj.a')).toBe(10)
      })
      it('should merge the value', () => {
        act(() => {
          store.merge('test-arr', [2, 3])
        })
        expect(store.get('test-arr')).toStrictEqual([2, 3])
      })
    })

    describe('#isEqual', () => {
      it('should check deepequality', () => {
        act(() => {
          store.merge('test-obj2', {
            a: 1,
            b: 5,
            c: 2
          })
        })
        expect(store.isEqual('test-obj2', {
          a: 1,
          b: 5,
          c: 2
        })).toBe(true)
      })
      it('should compare arrays', () => {
        act(() => {
          store.merge('test-arr2', [2, 3])
        })
        expect(store.isEqual('test-arr2', [2, 3])).toBe(true)
      })

      it('should compare values', () => {
        act(() => {
          store.set('test-val', 'test')
        })
        expect(store.isEqual('test-val', 'test')).toBe(true)
      })
    })
  })
})
