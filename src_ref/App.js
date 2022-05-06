import React from "react";
class Input extends React.Component {
  myRef = React.createRef()
  render() {
    return (
      <div>
        {/* 在当前组件上创建input1值为所绑定的元素节点 */}
        {/* <input ref={currentNode=>this.input1 = currentNode} type="text" placeholder="点击按钮输出"></input> */}
        {/* 绑定在当前组件实例上 */}
        <input ref={this.saveInput} type="text" placeholder="点击按钮输出"></input>
        <button onClick={this.showData}>点击输出</button>
        <input ref= {this.myRef} onBlur={this.blur} type="text" placeholder="失去焦点输出"></input>
      </div>
    );
  }
  showData = () => {
   console.log(this.input1);
  };
  saveInput=(c)=>{
    console.log(c);
  }
  blur = ()=>{
    console.log(this.myRef.current);
  }
}
function App() {
  return (
    <div className="App">
      {/* 批量传递属性 */}
      <Input />
    </div>
  );
}

export default App;
