import React from 'react'
import { deleteTodo, toggleTodo } from '../todoApi'

class TodoItem extends React.Component {
  toggleTodo () {
    const { todo } = this.props
    toggleTodo(todo.id)
  }

  deleteTodo () {
    const { todo } = this.props
    deleteTodo(todo.id)
  }

  render () {
    const toggleTodo = this.toggleTodo.bind(this)
    const deleteTodo = this.deleteTodo.bind(this)
    const { todo } = this.props
    return (
      <div>
        {todo.done &&
          <span><strike>{todo.text}</strike></span>}
        {!todo.done &&
          <span>{todo.text}</span>}
        <button onClick={toggleTodo}>done</button>
        <button onClick={deleteTodo}>delete</button>
      </div>
    )
  }
}

export default TodoItem
