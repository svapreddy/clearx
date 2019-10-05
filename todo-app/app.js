import React from 'react'
import reactDOM from 'react-dom'
const { useState, useEffect } = React
const { render, unmountComponentAtNode } = reactDOM
import './app.css'

import store from './store'

const todoStore = store.paths("todos")

const TodoApp = () => {
  
  const { data, unlinkComponent} = todoStore.linkComponent(useState())

  useEffect(() => unlinkComponent, [])

  // console.log(data)
  // console.log(store)

  return (
    <div class="container">
      <div class="header"> 
        <h3 class="header-title">Todos</h3>
        <button class="add-todo">Add Todo</button>
      </div>
      <div class="content">
        {data.length}
      </div>
      <div class="content">
        {data.join(', ')}
      </div>
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
  store.destroySegment(todoStore)
  console.log(store)
}, 15000)

render(<TodoApp />, document.body)