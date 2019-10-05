import React from 'react'
import reactDOM from 'react-dom'
import './app.css'

import store from './store'

const { useState, useEffect } = React
const { render, unmountComponentAtNode } = reactDOM

const todoStore = store.paths(['todos', 'count'])

const TodoApp = () => {
  const { data, unlinkComponent } = todoStore.linkComponent(useState())

  useEffect(() => unlinkComponent, [])

  console.log(data)
  console.log(store)

  return (
    <div class='container'>
      <div class='header'>
        <h3 class='header-title'>Todos</h3>
        <button class='add-todo'>Add Todo</button>
      </div>
      <div class='content'>
        {data.length}
      </div>
      <div class='content'>
        {data.join(', ')}
      </div>
    </div>
  )
}

store.ensureExists('profile.age', 30)

console.log(store.merge('test', {a: 1}))

// setInterval(() => {
//   store.increment('count', 100)
//   store.push('todos', Date.now())
// }, 1000)

// setInterval(() => {
//   store.decrement('count', 45)
// }, 1500)

// setTimeout(() => {
//   unmountComponentAtNode(document.body)
//   store.destroySegment(todoStore)
// }, 5000)

render(<TodoApp />, document.body)
