import React from 'react'
import Store from './../todoStore'
import TodoItem from './todoItem'
import AddTodo from './addTodo'

class TodoList extends React.Component {
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
      <>
        <h5>Data displayed here as part of Todo List View</h5>
        <div class='todoCount'> { localStore.todos.length } </div>
        { localStore.todos.map((item) => {
          return (
            <TodoItem todo={item} />
          )
        })}
      </>
    )
  }
}

export default TodoList
