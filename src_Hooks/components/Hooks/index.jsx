import React, { useState, useEffect, useRef } from "react";

function Demo() {
  const [count, setCount] = useState(0);
  const inputRef = useRef()
    //   useEffect(()=>{
    //     let timer=setInterval(()=>{
    //          setCount(count=>count+1)
    //      },1000)
    //      return ()=>{
    //         clearInterval(timer)
    //      }
    //   },[count])
    function add() {
      setCount(count + 1);
    };
  function getValue() {
    console.log(inputRef.current.value);
  }
  return (
    <div>
      <h1>当前求和为:{count}</h1>
      <input type="text" ref={inputRef}/>
      <button onClick={getValue}>获取输入框数据</button>
      <button onClick={add}>点击</button>
    </div>
  );
}
export default Demo;
