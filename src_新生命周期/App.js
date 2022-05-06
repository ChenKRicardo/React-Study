import React from "react";
// class Login extends React.Component {
//   state = { number: 0 };
//   render() {
//     return (
//       <div>
//         <h2>当前求和:{this.state.number}</h2>
//         <button onClick={this.add}>点击+1</button>
//       </div>
//     );
//   }

//   add = () => {
//     const { number } = this.state;
//     this.setState({
//       number: number + 1,
//     });
//   };
//   //若state的更新依赖传递的props
//   static getDerivedStateFromProps(props) {
//     console.log("getDerivedStateFromProps", props);
//     return null;
//     // return props
//   }
//   //在更新之前获取快照
//   getSnapshotBeforeUpdate() {
//     console.log("getSnapshotBeforeUpdate");
//     // return null;
//     return "陈康"
//   }
//   componentDidUpdate(prevProps,prevState,snapshotValue) {
//     console.log("componentDidUpdate",prevProps,prevState,snapshotValue);
//   }
// }

class Top extends React.Component{
  state = {newArr:[]}
  render(){
    const ul = {
      width:"200px",
      height:"150px",
      overflow:"auto"
    }
    const li = {
      height:"30px"
    }
    return (
      <ul style={ul} ref={node =>this.ul = node }>
        {this.state.newArr.map((item,index)=>{
          return <li key={index} style={li}>{item}</li>
        })}
      </ul>
    )
  };
  componentDidMount(){
    setInterval(() => {
      const {newArr} = this.state;
      const news = newArr.length+1
      this.setState({
        newArr:[news,...newArr]
      })
    }, 1000);
  }
  getSnapshotBeforeUpdate(){
    return this.ul.scrollHeight
  };
  componentDidUpdate(prevProps,prevState,height){
    this.ul.scrollTop += this.ul.scrollHeight-height
    // console.log(this.ul.scrollTop);
  }
}
function App() {
  return (
    <div className="App">
      {/* 批量传递属性 */}
      <Top/>
    </div>
  );
}

export default App;
