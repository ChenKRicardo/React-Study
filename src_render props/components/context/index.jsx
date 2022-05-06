import React, { useState } from "react";
import "./index.css";
const A = () => {
  return (
    <div className="parent">
      <h2>A组件父</h2>
      <B render={(name)=><C name={name}/>}/>
    </div>
  );
};
const B = (props) => {
  console.log(props);
  const [name] = useState('陈康')
  return (
    <div className="child">
      <h2>B组件子</h2>
      {props.render(name)}
    </div>
  );
};
const C = (props) => {
    console.log(props);
    return (
      <div className="son">
        <h2>C组件子</h2>
        <h3>接收B的数据:{props.name}</h3>
      </div>
    );
  };

export default A;
