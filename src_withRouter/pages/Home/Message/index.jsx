import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Detail from "./Detail";
export default class Message extends Component {
  state = {
    messageArr: [
      { id: "01", title: "消息1" },
      { id: "02", title: "消息2" },
      { id: "03", title: "消息3" },
    ],
  };
  replace = (id,title)=>{
    //跳转Detail组件且为replace
    this.props.history.replace(`/home/message/detail/${id}/${title}`)
  }
  push = (id,title)=>{
    //跳转Detail组件且为push
    console.log(this.props);
    this.props.history.push(`/home/message/detail/${id}/${title}`)
  }
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {messageArr.map((item) => {
          
            return (
              <li key={item.id}>
                {/* 向路由组件传递params参数 */}
                <Link to={`/home/message/detail/${item.id}/${item.title}`}>
                  {item.id}--{item.title}
                </Link>
                &nbsp;&nbsp;<button onClick={()=>this.push(item.id,item.title)}>push查看</button>
                &nbsp;<button onClick={()=>this.replace(item.id,item.title)}>replace查看</button>
              </li>
            );
          })}
        </ul>
        <hr />
        {/* 声明接收params参数 */}
        <Route path="/home/message/detail/:id/:title" component={Detail} />
      </div>
    );
  };
  
}
