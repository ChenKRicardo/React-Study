import React, { Component } from "react";
import { connect } from "react-redux";
import { addPerson } from "../../redux/person";
import { nanoid } from "nanoid";
class Person extends Component {
  addPerson = () => {
    const name = this.name.value;
    const age = this.age.value;
    this.props.addPerson({ id: nanoid(), name, age });
    this.name.value = "";
    this.age.value = "";
  };
  render() {
    console.log(this.props);
    const { person } = this.props.person;
    return (
      <div>
        <h1>Person,上方组件求和为：{this.props.count}</h1>
        <input
          ref={(c) => (this.name = c)}
          type="text"
          placeholder="输入姓名"
        />
        <input ref={(c) => (this.age = c)} type="text" placeholder="输入年龄" />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {person.map((item) => {
            return (
              <li key={item.id}>
                姓名：{item.name}--- 年龄：{item.age}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default connect(
  (state) => ({ person: state.personReducer, count: state.countReducer.value }),
  {
    addPerson,
  }
)(Person);
