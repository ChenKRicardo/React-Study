import React, { Component } from 'react';
import Demo from './components/Parent'
class App extends Component {
  state = {
    haseError:''//标识子组件是否产生错误
  }
  //子组件出现错误调用,并携带错误信息
  static getDerivedStateFromError(error){
    console.log(error);
    return {haseError:error}
  }
  componentDidCatch(error,info){
    console.log('此处统计错误，反馈给服务器',error,info);
    //info:发生错误的地点
    //error:错误的信息
  }
  render() {
    return (
      <div>
        {this.state.haseError?<h2>网络异常</h2>:<Demo/>}
      </div>
    );
  }
}

export default App;