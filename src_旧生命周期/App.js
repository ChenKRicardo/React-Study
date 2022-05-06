import React from "react";
class Login extends React.Component {
  state = { number: 0 };
  render() {
    return (
      <div>
       <h2>当前求和:{this.state.number}</h2>
       <button onClick={this.add}>点击+1</button>
      </div>
    );
  }
  //组件将要挂载
  componentWillMount(){}
  //组件挂载在页面之后调用
  componentDidMount() {
  };
  //控制组件更新的阀门，默认返回true,false则状态无法改变
  shouldComponentUpdate(){
    return false
  }
  //组件将要更新
  componentWillUpdate(){}
  //组件已经更新
  componentDidUpdate(){}
  //组件将要卸载
  componentWillUnmount(){
  };
  add = ()=>{
    const {number} = this.state
    this.setState({
      number:number+1
    })
  }
}

class A extends React.Component {
  state ={carName:"奔驰"}
  render(){
    return (
      <div>
        <h1>A</h1>
        <button onClick={this.changeCar}>点击</button>
        <B carName={this.state.carName}/>
      </div>
    )
  };
  changeCar = ()=>{
    this.setState({
      carName:"宝马"
    })
  }
}

class B extends React.Component {
  render(){
    return (
      <div>
        <h1>B:{this.props.carName}</h1>
      </div>
    )
  };
  //组件将要接收新的props钩子，第一次接受的不会触发，只有传过来的porps
  //发生改变才会触发
  componentWillReceiveProps(props){
    console.log("接收A组件的属性",props);
  }
}
function App() {
  return (
    <div className="App">
      {/* 批量传递属性 */}
      <A />
    </div>
  );
}

export default App;
