import React from "react";
class Login extends React.Component {
  state = { username: "", value: "apple", isChecked: false, personNumber: 2 };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="checkbox"
          onChange={this.handleForm('isChecked')}
          checked={this.state.isChecked}
        />
        <input
          type="number"
          onChange={this.handleForm('personNumber')}
          value={this.state.personNumber}
        />
        <button>登录</button>
      </form>
    );
  }
  handleForm = (dataType) => {
    return (e)=>{
      console.log(dataType,e.target.value);
      this.setState({
        [dataType]:e.target.value
      })
    }
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
