import React from 'react'
import { deleteTodo, toggleTodo } from '../todoApi'

class TodoItem extends React.Component {
  toggleTodo () {
    let { todo } = this.props
    toggleTodo(todo.id)
  }
  deleteTodo () {
    let { todo } = this.props
    deleteTodo(todo.id)
  }
  render () {
    let toggleTodo = this.toggleTodo.bind(this)
    let deleteTodo = this.deleteTodo.bind(this)
    let { todo } = this.props
    return (
      <div>
        {todo.done &&
          <span><strike>{todo.text}</strike></span>
        }
        {!todo.done &&
          <span>{todo.text}</span>
        }
        <button onClick={toggleTodo}>done</button>
        <button onClick={deleteTodo}>delete</button>
      </div>
    )
  }
}

export default TodoItem
