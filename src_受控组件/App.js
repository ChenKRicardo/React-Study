import React from "react";
//非受控组件
// class Login extends React.Component {
//   username = React.createRef();
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         用户名:
//         <input type="text" ref={this.username} name="username" />
//         密码:
//         <input
//           type="password"
//           ref={(c) => (this.password = c)}
//           name="password"
//         />
//         <button>登录</button>
//       </form>
//     );
//   }
//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { username, password } = this;
//     console.log(username.current.value);
//     console.log(`用户名:${username.current.value} 密码:${password.value}`);
//   };
// }
//受控组件
class Login extends React.Component {
  state = { username: "", value: "apple", isChecked: false, personNumber: 2 };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名:
        <input type="text" onChange={this.demo} name="username" />
        密码:
        <input type="password" name="password" />
        <select value={this.state.value} onChange={this.handleSelect}>
          <option value="apple">苹果</option>
          <option value="mango">芒果</option>
        </select>
        <input
          type="checkbox"
          name="isChecked"
          onChange={this.handleCheck}
          checked={this.state.isChecked}
        />
        <input
          type="number"
          name="personNumber"
          onChange={this.handleCheck}
          value={this.state.personNumber}
        />
        <button>登录</button>
      </form>
    );
  }
  demo = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleSelect = (e) => {
    
  };
  handleCheck = (e) => {
    const target = e.target;
    const value = e.target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.username);
  };
}
function App() {
  return (
    <div className="App">
      {/* 批量传递属性 */}
      <Login />
    </div>
  );
}

export default App;
