import React, { useEffect, useState, Fragment } from 'react'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'

import Clearx from 'clearx'

const data = {
    nums: [1, 2, 3, 4, 5],
    counter: 0,
    "key.has.dots.in.it": "key with dots",
    profile: {
        name: 'test',
        active: true
    }
}

const store = new Clearx(data)

const Component = () => {
    const { data, destroy } = store.bind({
        paths: {
            numbers: 'nums',
            counter: 'counter',
            name: 'profile.name',
            active: 'profile.active'
        },
        to: useState()
    })

    useEffect(() => destroy, [])

    return (
        <Fragment>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <div data-testid="name">{ data.name }</div>
            <div data-testid="counter">{ data.counter }</div>
        </Fragment>
    )
}

describe('React Components', () => {
    let rendered

    beforeEach(() => {
        rendered = render(<Component />)
    })

    describe('Component receives the data from store', () => {
        it('should have received the data', () => {
            expect()
        })
    })

    describe('Component receives the data from store', () => {
        
        describe('#name property', () => {
            it('has name displayed', () => {
                expect(rendered.getByTestId('name').textContent).toBe('test')
            })
            it('when name is changed should reflect new value', () => {
                const newValue = 'new-value'
                act(() => {
                    store.set('profile.name', newValue)
                })
                expect(rendered.getByTestId('name').textContent).toBe(newValue)
            })
        })

        describe('#counter', () => {
            it('has counter displayed', () => {
                expect(rendered.getByTestId('counter').textContent).toBe("0")
            })
            it ('increment by 1', () => {
                act(() => {
                    store.increment('profile.counter')
                })
                expect(rendered.getByTestId('counter').textContent).toBe("1")
            })
            it ('increment by 10', () => {
                act(() => {
                    store.increment('profile.counter', 10)
                })
                expect(rendered.getByTestId('counter').textContent).toBe("11")
            })
            it ('decrement by 10', () => {
                act(() => {
                    store.decrement('profile.counter', 10)
                })
                expect(rendered.getByTestId('counter').textContent).toBe("1")
            })
            it('decrement by 1', () => {
                act(() => {
                    store.decrement('profile.counter')
                })
                expect(rendered.getByTestId('counter').textContent).toBe("0")
            })
        })
    })
})