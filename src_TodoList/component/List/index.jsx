import React, { Component } from "react";
import Item from "../Item";
import PropTypes from "prop-types";
import "./index.css";
import PubSub from "pubsub-js";
export default class List extends Component {
  //对接受的props进行类型限制
  static propTypes = {
    receiveChecked: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };
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
    mouse: false,
  };
  render() {
    const {todos} = this.state
    const { deleteTodo, receiveChecked } = this.props;
    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          return (
            <Item
              key={todo.id}
              {...todo}
              receiveChecked={receiveChecked}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    );
  };
  componentDidMount() {
    const { todos } = this.state;
    PubSub.subscribe("receiveTodoObj", (_, todoObj) => {
      const newTodos = [todoObj, ...todos];
      this.setState({
        todos: newTodos,
      });
    });
    PubSub.publish('receiveTodos',todos)
  }
}
