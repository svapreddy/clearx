import React from 'react'
import { createTodo } from '../todoApi'

class AddTodo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todoText: ''
    }
    this.textChange = this.handleChange.bind(this)
    this.addTodo = this.createTodo.bind(this)
  }
  createTodo (event) {
    let { todoText } = this.state
    if (todoText.length === 0) return
    createTodo(todoText)
    this.setState({ todoText: '' })
    event.preventDefault()
    return false
  }
  handleChange (event) {
    this.setState({ todoText: event.target.value })
  }
  render () {
    let { todo } = this.props
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input value={this.state.todoText} onChange={this.textChange} />
          <button onClick={this.addTodo}>Add</button>
        </form>
        <br />
        <br />
      </div>
    )
  }
}

export default AddTodo
