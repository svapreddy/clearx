import React from 'react'
import reactDOM from 'react-dom'
import './app.css'

import store from './store'

const { useState, useEffect } = React
const { render, unmountComponentAtNode } = reactDOM

const todoStore = store.paths(['todos', 'count'])

const TodoApp = () => {

  const { data, unlink } = todoStore.link(useState())

  useEffect(() => unlink, [])

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
        { data[1] }
      </div>
    </div>
  )
}

todoStore.onUpdate((data) => {
  console.log('data updated', data)
})

todoStore.dataTransformer((data) => {
  data[1] *= 2
  return data
})

todoStore.dataTransformer((data) => {
  data[1] /= 2
  return data
})

store.ensureExists('profile.age', 30)

console.log(store.merge('test', {a: 1}))

setInterval(() => {
  unmountComponentAtNode(document.body)
}, 1000)

// setInterval(() => {
//   store.decrement('count', 45)
// }, 1500)

// setTimeout(() => {
//   unmountComponentAtNode(document.body)
//   store.destroySegment(todoStore)
// }, 5000)

render(<TodoApp />, document.body)
