import React from 'react'
import ReactDom from 'react-dom'
import Store from './todoStore'
import TodoList from './views/todoList'
import AddTodo from './views/addTodo'

class TodoApp extends React.Component {
  constructor (props) {
    super(props)
    // Just this is doing the magic!
    Store.slice({
      todos: ['todos']
    }, this)
  }
  render () {
    let localStore = this.state.store
    return (
      <React.Fragment>
        <AddTodo />
        <TodoList />
        <hr />
        <h5>The todo data accessed and displayed here directly from global store.</h5>
        <div class='todoCount'> Todo count: { Store.get(['todos']).length } </div>
        <code>
          { JSON.stringify(Store.get(['todos'])) }
        </code>
        <hr />
        <h5>The todo data accessed and displayed here from local sliced store.</h5>
        <div class='todoCount'> Todo count: { localStore.todos.length } </div>
        <code>
          { JSON.stringify(localStore.todos) }
        </code>
      </React.Fragment>
    )
  }
}

ReactDom.render(<TodoApp />, document.body)
