import React from "react";
import PropTypes from "prop-types";
//class使用props
class Person extends React.Component {
  //对属性进行类型限制
  static propTypes = {
    name: PropTypes.string.isRequired,
  };
  //对属性设置默认值
  static defaultProps = {
    sex: "男",
  };
  render() {
    const { name, sex, age } = this.props;
    return (
      <ul>
        <li>姓名:{name}</li>
        <li>性别:{sex}</li>
        <li>年龄:{age}</li>
      </ul>
    );
  }
}
//函数使用props
function Person2(props) {
  console.log(props);
  const { name, age, sex } = props;
  return (
    <ul>
      <li>姓名:{name}</li>
      <li>性别:{sex}</li>
      <li>年龄:{age}</li>
    </ul>
  );
}
Person2.defaultProps = {
  sex: "男",
};
const person = { name: "陈康", age: "22" };
function App() {
  return (
    <div className="App">
      {/* 批量传递属性 */}
      <Person {...person} />
      <Person2 {...person} />
    </div>
  );
}

export default App;
