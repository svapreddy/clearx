import Store from './todoStore'

let getTodo = (id) => {
  let todos = Store.get(['todos'])
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return {
        index: i,
        todo: todos[i]
      }
    }
  }
  return {}
}

// Instead of using ES6 class, just showcasing way to write tree shaking friendly code

export let deleteTodo = (id) => {
  let todoInfo = getTodo(id)
  Store.delete(['todos', todoInfo.index])
}

export let toggleTodo = (id) => {
  let todoInfo = getTodo(id)
  Store.set(['todos', todoInfo.index, 'done'], !todoInfo.todo.done)
}

export let createTodo = (text) => {
  Store.push(['todos'], {
    text: text,
    id: Date.now(),
    done: false
  })
}
