import React, { Component } from "react";
import {withRouter} from 'react-router-dom'
 class Header extends Component {
  back = ()=>{
    this.props.history.back()
  };
  forward = ()=>{
    this.props.history.forward()
  };
  go = ()=>{
    this.props.history.go(2)
  };
  render() {
    return (
      <div className="page-header">
        <h2>React Router Demo</h2>
        <button onClick={this.back}>ει</button>&nbsp;
        <button onClick={this.forward}>εθΏ</button>&nbsp;
        <button onClick={this.go}>go</button>
      </div>
    );
  }
}
export default withRouter(Header)