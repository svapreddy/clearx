import React, { Component, useEffect, useState, Fragment } from 'react'
import store from './store'

class App extends React.Component {
  constructor (props) {
    super(props)
    store.bind({
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
      to: this
    })
  }

  render () {
    const { store } = this.state
    return (
      <>
        <div data-testid='name'>{store.name}</div>
        <div data-testid='counter'>{store.counter}</div>
        <div data-testid='age'>{store.age}</div>
        <div data-testid='keyWithDot'>{store.keyWithDot}</div>
        <div data-testid='active'>{store.active.toString()}</div>
        <div data-testid='test-arr'>{store.testArr.join(' ')}</div>
        <div data-testid='test-obj'>{JSON.stringify(store.testObj)}</div>
        <div data-testid='last-name'>{store.lastName}</div>
        <div data-testid='numbers'>{store.numbers.join(' ')}</div>
        <div data-testid='names'>{(store.names || []).join(' ')}</div>
      </>
    )
  }
}

export default App
