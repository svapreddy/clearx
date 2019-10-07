import React from 'react'
import reactDOM from 'react-dom'
import './app.css'

import store from './store'

const { useState, useEffect } = React
const { render, unmountComponentAtNode } = reactDOM

const todoStore = store.paths(['todos', 'count'])
const countValue = store.paths('count')

const TodoApp = () => {

  const [ data, unlink ] = todoStore.link(useState())
  const [ count ] = countValue.link(useState())

  useEffect(() => unlink, [])

  // console.log(data)
  // console.log(store)
  // console.log(Object.keys(window.stateFn[1]))

  return (
    <div class='container'>
      <div class='header'>
        <h3 class='header-title'>Todos</h3>
        <button class='add-todo'>Add Todo</button>
      </div>
      <div class='content'>
        {data[0].length}
      </div>
      <div class='content'>
        { data[1] + ' : ' + count }
      </div>
    </div>
  )
}

todoStore.onUpdate((data) => {
  // console.log('data updated', data)
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

// setInterval(() => {
//   unmountComponentAtNode(document.body)
// }, 10000)

setInterval(() => {
  store.push('todos', Date.now())
  store.increment('count', 0.45)
}, 100)

// setTimeout(() => {
//   unmountComponentAtNode(document.body)
//   store.destroySegment(todoStore)
// }, 5000)

render(<TodoApp />, document.body)
