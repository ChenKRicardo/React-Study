import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import List from "./component/List";
import React, { Component } from "react";

class App extends Component {
  state = {
    todos: [
      {
        id: "001",
        name: "原神",
        done: false,
      },
      {
        id: "002",
        name: "明日方舟",
        done: false,
      },
      {
        id: "003",
        name: "崩坏3rd",
        done: true,
      },
    ],
  };
  render() {
    return (
      <div className="App">
        <div className="todo-container">
          <div className="todo-wrap">
            <Header/>
            <List
              receiveChecked={this.receiveChecked}
              deleteTodo={this.deleteTodo}
            />
            <Footer checkAll={this.checkAll} clearDoneTodo={this.clearDoneTodo}/>
          </div>
        </div>
      </div>
    );
  }
  //子传父值，通过方法
  receiveChecked = (id, done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, done };
      else return todo;
    });
    this.setState({
      todos: newTodos,
    });
  };
  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: newTodos,
    });
  };
  checkAll = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map((todo) => {
      return { ...todo, done };
    });
    this.setState({
      todos: newTodos,
    });
  };
  clearDoneTodo = ()=>{
    const { todos } = this.state;
    const newTodos = todos.filter((todo) => {
      return todo.done!==true
    });
    this.setState({
      todos: newTodos,
    });
  };
}

export default App;
