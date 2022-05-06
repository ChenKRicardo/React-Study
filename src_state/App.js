import React from "react";
//class组件
// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { date: new Date(), isHot: true };
//     this.changeWeather = this.changeWeather.bind(this)
//     //改变this指向
//   }
//   render() {
//     const { date, isHot } = this.state;
//     return (
//       <div>
//         <h1>{date.toLocaleTimeString()}</h1>
//         <h1 onClick={this.changeWeather}>{isHot ? "炎热" : "凉爽"}</h1>
//       </div>
//     );
//   }
//   //通过Clock实例调用changeWeather时，changeWeather中的this就是Clock实例
//   //类的方法默认开启局部的严格模式，所以changeWeather的this为undefined
//   changeWeather(){
//     this.setState({
//       isHot:!this.state.isHot
//     })
//     console.log(this);
//   }
// }
//class组件简写
class Clock extends React.Component {
  //初始状态
  state = { isHot: true };
  render() {
    const { isHot } = this.state;
    return (
      <div>
        <h1 onClick={this.changeWeather}>{isHot ? "炎热" : "凉爽"}</h1>
      </div>
    );
  }
  //自定义方法
  changeWeather = () => {
    this.setState({
      isHot: !this.state.isHot,
    });
    console.log(this);
  };
}
function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

export default App;
