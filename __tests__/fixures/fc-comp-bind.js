import React, { useEffect, useState, Fragment } from 'react'
import store from './store'

const Component = () => {
  const [data, unlink] = store.bind({
    paths: {
      numbers: 'nums',
      testArr: 'profile.testArr',
      counter: 'profile.counter',
      name: 'profile.name',
      active: 'profile.active',
      age: 'profile.age',
      keyWithDot: 'key\\.has\\.dots\\.in\\.it',
      testObj: 'profile.testObj',
      lastName: 'profile.lastName',
      names: 'names',
      test: 'test'
    },
    to: useState()
  })

  useEffect(() => unlink, [])

  return (
    <>
      <div data-testid='name'>{data.name}</div>
      <div data-testid='counter'>{data.counter}</div>
      <div data-testid='age'>{data.age}</div>
      <div data-testid='keyWithDot'>{data.keyWithDot}</div>
      <div data-testid='active'>{data.active.toString()}</div>
      <div data-testid='test-arr'>{data.testArr.join(' ')}</div>
      <div data-testid='test-obj'>{JSON.stringify(data.testObj)}</div>
      <div data-testid='last-name'>{data.lastName}</div>
      <div data-testid='numbers'>{data.numbers.join(' ')}</div>
      <div data-testid='names'>{(data.names || []).join(' ')}</div>
    </>
  )
}

export default Component
