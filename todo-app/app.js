import React from 'react'
import reactDOM from 'react-dom'
const { useState, useEffect } = React
const { render, unmountComponentAtNode } = reactDOM
import './app.css'


import store from './store'

const TodoApp = () => {
  
  const { data, destroy } = store.bind({
    paths: {
      todos: 'todos',
      count: 'count'
    },
    to: useState()
  })

  useEffect(() => destroy, [])

  console.log(data)
  console.log(store)

  return (
    <div class="container">
      { data.count }
      <br />
      { data.todos.join(', ') }
    </div>
  )
}

setInterval(() => {
  store.increment('count', 100)
  store.push('todos', Date.now())
}, 1000)

setInterval(() => {
  store.decrement('count', 45)
}, 1500)

setTimeout(() => {
  unmountComponentAtNode(document.body)
}, 15000)

render(<TodoApp />, document.body)