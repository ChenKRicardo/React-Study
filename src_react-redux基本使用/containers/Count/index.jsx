// 引入count的UI组件
import CountUI from "../../components/Count";

//引入connect用于连接UI组件与redux
import { connect } from "react-redux";
import { asyncIncrement, decrement, increment } from "../../redux/count_reducer";

//函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件propsi的value
//传递状态
const mapStateToProps = (state, ownProps) => {
  return {
    count: state,
  };
};
//传递操作状态的方法
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increment: (value) => {
      dispatch(increment(value));
    },
    decrement:(value)=>{
        dispatch(decrement(value))
    },
    asyncIncrement:(value,time)=>{
        dispatch(asyncIncrement(value,time))
    }
  };
};
//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
