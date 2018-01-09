import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList } from './components/todo';
import { addTodo, generateId } from './lib/todoHelpers';

class App extends Component {

  state = {
    currentTodo: "",
    errorMessage: "",
    todos: [
      { id: 1, name: 'Learn JSX', isComplete: false },
      { id: 2, name: 'Build an Awesome App', isComplete: false },
      { id: 3, name: 'Ship it!', isComplete: true }
    ]
  }

  handleOnchangeCheckbox = (event) => { 
    let todos = this.state.todos

    todos.forEach(todo => {
      if (todo.id === parseInt(event.target.id, 2)) {
        todo.isComplete = true
      } else { 
        todo.isComplete = false
      }
    });

    this.setState({todos: todos})
  }

  handleOnchangeInput= (event)=> {
    this.setState({currentTodo: event.target.value, errorMessage: ""})
  }

  handleSubmit = (event) => { 
    event.preventDefault()

    const newTodo = { id: generateId(), name: this.state.currentTodo, isComplete: false }

    const updatedTodos = addTodo(this.state.todos, newTodo)
    
    this.setState({ todos: updatedTodos, currentTodo: '' })
  }

  handleEmptySubmit = (event) => {
    event.preventDefault()

    this.setState({ errorMessage: "Please supply a todo name" })
  }

  render() {

    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="todoWrapper">
          {this.state.errorMessage && <div className="errorMessage">{this.state.errorMessage}</div>}  
          
          <TodoForm
            handleSubmit={ submitHandler }  
            currentTodo={this.state.currentTodo}
            handleOnchangeInput={this.handleOnchangeInput} />
          
          <TodoList
            todos={this.state.todos}
            handleOnchangeCheckbox={this.handleOnchangeCheckbox} />
        </div>
      </div>
    );
  }
}

export default App;