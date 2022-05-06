import React, { useState, Fragment, createContext } from "react";
//创建保存数据的Context对象
const MyContext = createContext();
const { Provider, Consumer } = MyContext;
const A = () => {
  const [name] = useState("陈康");
  const [age] = useState("18");
  return (
    <Fragment>
      <h2>A组件父</h2>
      <h3>姓名:{name}</h3>
      <hr />
      <Provider value={{name,age}}>
        <B name={name} age={age}/>
      </Provider>
    </Fragment>
  );
};
const B = (props) => {
    console.log(props);
  return (
    <Fragment>
      <h2>B组件子</h2>
      <h3>从A组件接收的数据:{props.name}</h3>
      <hr />
      <C />
    </Fragment>
  );
};

const C = () => {
  return (
    <Fragment>
      <h2>C组件孙</h2>
      <h3>从A组件接收的数据:
          <Consumer>
              {
                  value =>{
                      return `${value.name},年龄：${value.age}`
                  }
              }
          </Consumer>
      </h3>
    </Fragment>
  );
};

export default A;
