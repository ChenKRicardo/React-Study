import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";
class Footer extends Component {
  state ={todos:[]}
  handleCheckAll = (e)=>{
    this.props.checkAll(e.target.checked)
  }
  delDoneTodo = ()=>{
    if(window.confirm("是否清楚已完成？"))
    return this.props.clearDoneTodo()
  }
  render() {
    const { todos } = this.state;
    //计算已完成个数
    const doneCount = todos.reduce((pre, cur) => {
      return pre + (cur.done ? 1 : 0);
    }, 0);
    //总数
    const total = todos.length;
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount===total&&total!==0?true:false}/>
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button className="btn btn-danger" onClick={this.delDoneTodo}>清除已完成任务</button>
      </div>
    );
  };
  componentDidMount(){
    PubSub.subscribe('receiveTodos',(_,todos)=>{
      this.setState({
        todos
      })
    })
  }
}

export default Footer;
