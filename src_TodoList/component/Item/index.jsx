import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";
export default class Item extends Component {
 state ={mouse:false}
  over = (flag) => {
    return () => {
      this.setState({
        mouse: flag,
      });
    };
  };
  leave = (flag) => {
    return () => {
      this.setState({
        mouse: flag,
      });
    };
  };
  handleCheck = (id) => {
    return (e) => {
      this.props.receiveChecked(id, e.target.checked);
    };
  };
  delTodo = (id, name) => {
    return () => {
      if (window.confirm(`确定删除${name}吗？`)) {
        this.props.deleteTodo(id);
      }
    };
  };
  render() {
    const { done, name, id } = this.props;
    const { mouse } = this.state;
    return (
      <li
        style={{ backgroundColor: mouse ? "#ddd" : "#fff" }}
        onMouseEnter={this.over(true)}
        onMouseLeave={this.leave(false)}
      >
        <label>
          <input
            type="checkbox"
            checked={done}
            onChange={this.handleCheck(id)}
          />
          <span>{name}</span>
        </label>
        <button
          className="btn btn-danger"
          style={{ display: mouse ? "block" : "none" }}
          onClick={this.delTodo(id, name)}
        >
          删除
        </button>
      </li>
    );
  }
}
