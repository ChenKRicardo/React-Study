import React, { Component } from "react";
//引入store,获取保存中的状态
import store from "../../redux/store";
import { increment, decrement,asyncIncrement } from "../../redux/count_reducer";
// import { useSelector, useDispatch } from 'react-redux'
export default class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    //通知redux加value
    store.dispatch(increment(value));
  };
  decrement = () => {
    const { value } = this.selectNumber;
    store.dispatch(decrement(value));
  };
  odd = () => {
    const { value } = this.selectNumber;
    const { countReducer } = store.getState();
    if (countReducer.value % 2 !== 0) return store.dispatch(increment(value));
  };
  async = () => {
    const { value } = this.selectNumber;
    store.dispatch(asyncIncrement(value,3000))
  };
  render() {
    const { countReducer } = store.getState();
    return (
      <div>
        <h1>当前求和为:{countReducer.value}</h1>&nbsp;
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.odd}>奇数加</button>&nbsp;
        <button onClick={this.async}>延迟加</button>
      </div>
    );
  }
}
