import React, { Component } from "react";

export default class Demo extends Component {
  state = { count: 0 };
  add = () => {
    // const { count } = this.state;
    //对象式的setState
    // this.setState(
    //   {
    //     count: count + 1,
    //   },
    //   () => {
    //     console.log(this.state.count);
    //   }
    // );
    //函数式
    this.setState((state,props)=>{
      console.log(state,props);
    })
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>当前求和为:{count}</h1>
        <button onClick={this.add}>加1</button>
      </div>
    );
  }
}
