import { connect } from "react-redux";
import {
  asyncIncrement,
  decrement,
  increment,
} from "../../redux/count_reducer";
import React, { Component } from "react";
class Count extends Component {
  increment = () => {
    const { value } = this.selectNumber;
    this.props.increment(value)
  };
  decrement = () => {
    const { value } = this.selectNumber;
    this.props.decrement(value)
  };
  odd = () => {
    const {countReducer} = this.props.count
    const { value } = this.selectNumber;
    if(countReducer.value%2!==0){
      this.props.increment(value)
    }
  };
  async = () => {
    const { value } = this.selectNumber;
    this.props.asyncIncrement(value,1000)
  };
  render() {
    console.log(this.props);
    const {countReducer} = this.props.count
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
export default connect((state) => ({ count: state }), {
  increment,
  decrement,
  asyncIncrement,
})(Count);
//默认派发dispatch
