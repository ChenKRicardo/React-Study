import React, { Component } from "react";
import { nanoid } from "nanoid";
import PubSub from "pubsub-js";
import "./index.css";
class Header extends Component {
  render() {
    return (
      <div className="todo-header">
        <input
          onKeyUp={this.handleKeyUp}
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
        />
      </div>
    );
  }
  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.trim() === "") {
        alert("输入值不能为空");
        return
      };
      const todoObj = { id: nanoid(), name: e.target.value, done: false };
      PubSub.publish('receiveTodoObj',todoObj)
      e.target.value = null;
    }
  };
}

export default Header;
