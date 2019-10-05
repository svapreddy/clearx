import Store from './todoStore'

const getTodo = (id) => {
  const todos = Store.get(['todos'])
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

export const deleteTodo = (id) => {
  const todoInfo = getTodo(id)
  Store.delete(['todos', todoInfo.index])
}

export const toggleTodo = (id) => {
  const todoInfo = getTodo(id)
  Store.set(['todos', todoInfo.index, 'done'], !todoInfo.todo.done)
}

export const createTodo = (text) => {
  Store.push(['todos'], {
    text: text,
    id: Date.now(),
    done: false
  })
}
