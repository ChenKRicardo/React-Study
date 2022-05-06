# React

# WHAT?

**react是一个将数据渲染为HTML视图的开源JavaScript库**

1. 采用**组件化**模式、**声明式编码**，提高开发效率及组件复用率
2. 使用**虚拟DOM**和**Diffing算法**，尽量减少与真是DOM交互
3. 在**React Native**中可以使用React语法进行**移动端**开发

# JSX

1. JSX是一个表达式，会被转成普通的JS函数调用
2. JSX可以内嵌表达式
3. JSX可以指定属性
   1. 通过引号，将属性值指定为字符串字面量
   2. 通过{}，插入一个JS表达式
   3. 2者不可同时使用，即括号外加引号
4. JSX防止注入攻击(XSS)：所有的内容在进行渲染时会默认进行转义成字符串，这样永远不会注入哪些自己明确编写的内容。

# 元素渲染

React只更新需要更新的部分，React DOM每次的渲染都会将元素和其子元素与之前的状态进行比较，只会更新有差异的部分。

# 组件&Props

1. 自定义组件名必须以大写字母开头，否则识别为原生DOM标签

   ```
   <Welcome/>则代表一个组件
   <div/>则仅代表HTML标签
   ```

## 函数组件

1. ### 	what：接受唯一带有数据的Props(代表属性)，并返回一个React元素

   ```
   function Welcome(props){
   	return <h1>{props}</h1>
   }
   ```

   

## Class组件

## 函数组件转化为Class组件

## 组合组件

组件可以在输出中引用其他组件

```js
function Welcome(props){
  return <h1>{props.name}</h1>
};
function App() {
  return (
    <div className="App">
      <Welcome name="ck1"/>
      <Welcome name="ck2"/>
      <Welcome name="ck3"/>
    </div>
  );
}

```

## 提取组件

## Props的只读性

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

# State

1. State与props类似，但State是私有的，并且完全受控于当前组件

2. state不可以直接的更改例如:this.state.xxx = ?

   ```
   状态必须通过此方式进行更新，且更新是一种合并，而不是替换
   this.setDtat({
   	xxx:???
   })
   每次状态的更改，构造器只执行一次
   render调用1（初始渲染）+n（状态更新次数）次
   ```

3. 组件中render的this指向组件的实例对象

4. 组件的自定义方法this指向undefined

   ```
   解决
   	1.强制绑定this:通过bind()改变this指向
   	2.箭头函数
   ```

5. 如何确定将数据放在哪个组件

   1.  某个组件用：放在自身的state中
   2. 多个组件用：放在共同的父组件state中(状态提升)


```js
//class组件
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isHot: true };
    this.changeWeather = this.changeWeather.bind(this)
      //改变this指向
  }
  render() {
    const { isHot } = this.state;
    return (
      <div>
        <h1 onClick={this.changeWeather}>{isHot ? "炎热" : "凉爽"}			</h1>
      </div>
    );
  }
  //通过Clock实例调用changeWeather时，changeWeather中的this就是Clock实例
  //类的方法默认开启局部的严格模式，所以changeWeather的this为undefined
  changeWeather(){
    console.log(this);
      this.setState({
      isHot:!this.state.isHot
    })
  }
}
```

```js
class组件简写
class Clock extends React.Component {
  state = { isHot: true };
  render() {
    const { isHot } = this.state;
    return (
      <div>
        <h1 onClick={this.changeWeather}>{isHot ? "炎热" : "凉爽"}</h1>
      </div>
    );
  }
  changeWeather = () => {
    this.setState({
      isHot: !this.state.isHot,
    });
    console.log(this);
  };
}
```

# props

1. props属性不可更改

2. 可以为组件传值

3. 可以对属性进行类型限制

   ```js
   import PropTypes from "prop-types";
   class Person extends React.Component{
   	 //对属性进行类型限制
     static propTypes = {
       name: PropTypes.string.isRequired,
     };
     //对属性设置默认值
     static defaultProps = {
       sex: "男",
     };
   }
   ```

4. 构造器是否接受props，是否传递给super,取决于：是否希望在构造器中通过this访问props

   ```js
   class Person React.Component{
       //接受props
   	construction(props){
   		super(props)
           log(this.porps)
       //传递props
   	}
   }
   ```

5. 函数接受props:通过传递参数

   ```js
   function Person2(props) {
   	log(props)
   }
   <Person2 {...person}/>
   ```

# refs

1. 字符串形式(弃用)，效率不高

   ```js
   <input ref='input1'>
   获取标签
   this.refs.input1
   ```

2. 回调函数形式

   1. 问题:当页面数据进行更新时，第一次传入参数null，第二次才传入DOM参数

      ```js
       {/* 在当前组件上创建input,值为所绑定的元素节点 */}
       <input ref={currentNode=>this.input = currentNode} />
       log(this.input)
      要获取输入框的值：this.input.value
      ```

      

   2. 这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。

   3. 其绑定的函数已经释放所以第一次为null

   4. 解决方法：通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题

      ```js
      将ref绑定在组件实例上
      <input ref={this.saveInput}/>
      ```

   3.createRef形式（推荐）

   ```
   React.createRef()被调用后可以返回一个容器，该容器存储被ref所标识的节点，但只能存储一个节点的标识
   class....{
   	myRef = React.createRef()
   	<input ref= {this.myRef}/>
   }
   要获取输入框的值：this.myref.current.value
   ```

# 事件处理

1. React使用的是自定义事件，而不是原生DOM事件--为了更好的兼容性
2. React的事件是通过事件委托方式处理的（委托给组件最外层元素）--为了高效
3. 通过e.target得到发生事件的DOM元素对象

# 收集表单数据

## 非受控组件

**其表单的数据通过DOM节点来处理(ref)**

## 受控组件

1. **其表单数据由React组件来管理**,随着用用户的输入进行更新（onChange），将数据存储于状态中和从状态中取值

```
class...{
  state ={username:""}
render(){
	<input type="text" onChange={this.demo} name="username" />
	}	
 demo = (e)=>{
    this.setState({
      username:e.target.value
    })
  };
}
```

1. 处理多个输入：思路为每个表单项添加name元素作为标识，改变状态时进行判断e.target.name选择要执行的操作

# 高阶函数（函数柯里化）

## **高阶函数**

1. 若A函数，接受的参数是一个函数，则A是高阶函数
2. 若A函数，调用的返回值是一个函数，则A是高阶函数

## 函数的柯里化

通过函数调用继续返回函数的方式，实现多次接受参数最后统一处理的函数编码形式

# 生命周期

## 旧版本![react生命周期(旧)](C:\Users\ck\Desktop\照片\react生命周期(旧).png)

## 新版本![react生命周期(新)](C:\Users\ck\Desktop\照片\react生命周期(新).png)

1. 废弃了以下生命周期钩子
   1. `componentWillMount`
   2. `componentWillReceiveProps`
   3. `componentWillUpdate`
   
2. 新增了2个钩子
   1. `getDerivedStateFromProps`
   
      ```js
      新的静态钩子，在组件实例化和被渲染时调用，返回一个对象来更新state,或者null表明新的props不需要任何state更新
      将组件传递的props作为返回的对象更新state,且state一旦更改就不能再次更改
      适用的范围：state的值取决于传递的props
      缺点：派生状态会导致代码冗余，且使得组件难以维护
       static getDerivedStateFromProps(props) {
          // return null
          return props
        }
      ```
   
      
   
   2. `getSnapshotBeforeUpdate`
   
      ```
       //在更新之前获取快照
        getSnapshotBeforeUpdate() {
          // return null;
          return "陈康"
        }
        componentDidUpdate(prevProps,prevState,snapshotValue) { console.log("componentDidUpdate",prevProps,prevState,snapshotValue);
        }
        snapshotValue:更新之前的返回值
        可以用于保持滚动条的位置
      ```

# DOM的diffing算法

## react/Vue中key的作用

key作为虚拟DOM对象的标识，当状态的数据发生改变时，react会根据【新数据】生成【新的虚拟DOM】随后react会将新旧DOM树进行比较。

1. 旧虚拟DOM中找到了与新虚拟DOM相同的key
   1.  若新旧DOM树一致，则使用旧的DOM树数据
   2. 若不一致发生了改变，则虚拟DOM生成真实DOM,随后替换页面之前的真是DOM
2. 旧虚拟DOM未找到与新虚拟相同的key
   1. 根据数据创建新的真实DOM,随后渲染到页面

## 遍历列表时，key最好不用index

1. 若对数据进行破坏顺序的操作：产生没必要的真实DOM更新=>界面效果没问题，但效率低
2. 如果结构还包含输入的类的DOM：会产生错误的DOM更新=>界面有问题
3. 如果仅用于渲染列表的展示，不破坏结构，index作为key是没问题的。

# 组件通信

1. 父=>子：props

2. 子=>父:父给子方法，子调用并传递数据

   ```
   <App>
   	<Son 方法名={this.方法名}/>
   </APP>
   子组件调用父传递的方法：this.props.方法名
   ```

   

# react脚手架配置代理总结



## 方法一

> 在package.json中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）



## 方法二

1. 第一步：创建代理配置文件

   ```
   在src下创建配置文件：src/setupProxy.js
   ```

2. 编写setupProxy.js配置具体代理规则：

   ```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以配置多个代理，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。

# Fecth

```js
优化前
	fetch(url).then(
	//联系服务器成功
		response=>{ return response.json() }
	).then(
	//获取数据成功
		response => log(response)
	).catch(err){
		log(err)
	}
```



```js
优化后
try{
	let response = await fetch(url)
	const data =await response.json
    log(data)
 }catch(error){
	log(error)
}
```

# React-Router-DOM@5

1. 路由跳转

   ```
   <Link to="/url"/>
   ```

   

2. Route标签进行路径的匹配

   ```
   <Route path="/.." component={路由组件}>
   ```

3. <APP>最外侧包裹<BrowserRouter>或<HashRouter>

4. 路由组件与一般组件

   写法

   ```
   一般组件：<Demo/>
   路由组件:<Route path="/demon" component={Demo}>
   ```

   存放位置：

   1. 一般组件:components
   2. 路由组件:pages

   接受的props不同

   1. 一般组件:组件标签传递什么就收到什么

   2. 路由组件:默认接收到history,location,match

      ```
      history：{
      	go: ƒ go(n)
      	goBack: ƒ goBack()
      	goForward: ƒ goForward()
      	push: ƒ push(path, state)
      	replace: ƒ replace(path, state)
      }
      location:{
      	pathname: "/about"
      	search: ""
      	state: undefined
      }
      match:{
      	params: {}
      	path: "/about"
      	url: "/about"
      }
      ```

   <NavLink>=><Link>的升级版：实现高亮路由链接

   ```
   <NavLink activeClassName="默认是active"> 默认给改路由生成active样式属性，切换到哪个路由就添加active样式
   标签体内容是一个特殊的标签属性，通过this.props.children获取
   ```

   <Switch>:如果path路径相同,组件不同，只匹配第一次的路径，后面相同的则不展示。**可以提高路由匹配效率（单一匹配）**

   1. 通常情况下，path和component是一一对应的

   ```
   <Route path="/home" component={Home} />
   {/* <Route path="/home" component={Text} />
   ```

   9.解决多级路径刷新页面样式丢失问题
   
   1.pub1ic/index.html中引入样式时不写./     写/（常用）
   2,pub1ic/index.htm1l中引入样式时不写./  写%PUBLIC URL%(常用)
   3,使用HashRouter
   
   10.严格匹配与模糊匹配
   
   1. 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
   2. 开启"格匹配：<Route exact={true}path="/about"component={About}/>
   3. 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由
   
   <Redirect>当所有路径都没匹配上则去指定的路径，写在所有路由注册的最下方
   
   ```
   <Redirect to='/ck/home'/>
   ```
   
   嵌套路由:**路由的匹配顺序按照注册路由的顺序先父后子**
   
   向路由组件传递参数数据
   
   1. params传参
   
      ```
      路由携带参数
      <Link to={`/home/message/detail/${item.id}/${item.title}`}/>
      路由接受参数（声明接收）
      <Route path="/home/message/detail/:id/:title" component={Detail}/>
      路由组件获取参数
       this.props.match.params;           
      ```
   
   2. search参数
   
      ```
      路由携带参数
      <Link to='/demo/test?name=tom&age=l8'}>
      注册路由（无需声明，正常注册即可）
      <Route path="/demo/test"component:={Test}/>
      接收参数
      备注：获取到的search是urlencoded:编码字符串，需要借助**qs**解析:
      import qs from 'qs';
      const{search}=this.props.location
      qs.parse(search.slice(1))
      ```
   
   3. state参数
   
      ```
      路由链接（携带参数）：
      <Link to={{pathName:/demo/test',state:{name:'tom',age:18}}}>
      注册路由（无需声明，正常注册即可）：
      <Route path:="/demo/test"component=(Test}/>
      接收参数：this,props,location,state
      备注：刷新也可以保留住参数，地址栏不会显示携带的参数
      ```
   
   11.push&&replace(和Vue一样)
   
   ```
   默认：push
   <Link replace>
   ```
   
   12.编程式路由导航
   
   ​	**借助this.props.history中的api进行操作**
   
   ```
   this.props.history.replace()
   例子：三种传参方式+2中跳转方式
   1.params
   this.props.history.push(`/home/message/detail/${id}/${title}`)
   2.search
   this.props.history.push(`/home/message/detail/?$id={id}&title=${title}`)
   3.state
   this.props.history.push(`/home/message/detail`,{id,title})
   ```
   
   13.withRouter
   
   ```
   作用：让一般组件同样可以使用路由组件的api,返回的是一个新组件
   import {withRouter} from 'react-router-dom'
   class Header{
   	
   }
   export default withRouter(Header)
   ```
   
   14.BrowserRouter与HashRouter的区别
   1.底层原理不一样：
   BrowserRouter使用的是H5的history API,不兼容IE9及以下版本。
   HashRouter使用的是URL的哈希值。
   2.path表现形式不一样
   BrowserRouter的路径中没有#，例如：1 ocalhost:3808/demo/test
   HashRouter的路径包含#，例如：localhost:3000/#/demo/test
   3,**刷新后对路由state参数的影响**
   (1).BrowserRouter没有任何影响，因为state保存在history.对象中。
   (2).HashRouter刷新后会导致路由state参数的丢失。
   
   

# Antd

# Redux

![redux原理图](C:\Users\ck\Desktop\照片\redux原理图.png)

 

# React-Redux

![react-redux模型图](C:\Users\ck\Desktop\照片\react-redux模型图.png)

1. **明确两个概念：**

   1. UI组件：不能使用任何redux的api,只负责页面的呈现、交互等。
   2. 容器组件负贵和redux通信，将结果交给UI组件。

2. 如何创建一个容器组件一靠react-redux的connect函数

   1. connect(mapStateToProps,mapDispatchToProps)(UI)
   2. -mapStateToProps:映射状态，返回值是一个对象
   3. -mapDispatchToProps:映射操作状态的方法，返回值是一个对象

3. 备注：容器组件中的store,是靠props传进去的，而不是在容器组件中直接引入

   ```
   <Provider store={store}>
       <React.StrictMode>
         <App />
       </React.StrictMode>
     </Provider>
     这样App的所有子组件就默认都可以拿到store了。
   ```

   

4. **重点**：**mapDispatchToProps,也可以是一个对象**（简写）

   ```
   export default connect((state) => ({ count: state }), {
     increment,
     decrement,
     asyncIncrement,
   })(CountUI);
   ```

# 纯函数

1. .一类特别的函数：只要是同样的输入（实参），必定得到同样的输出返回)
2. 必须遵守以下一些约束·
   1. 不得改写参数数据
   2. 2)不会产生任何副作用，例如网络请求，输入和输出设备
   3. 3)不能调用Date.now0或者Math.random等不纯的方法
3. redux的reducer函数必须是一个纯函数

# setState

## setState更新状态的2种写法

```
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```



------



#  lazyLoad

## 路由组件的lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))
	
	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```



------



# Hooks

## 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

## 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

## 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
 setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setCount(99);
  setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

## 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) 
// 如果指定的是[], 回调函数只会在第一次render()后执行。
//可以传入要监测的状态(渲染次数1+n次)，
//不写[],则监视所有状态
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

## 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



------



#  Fragment

## 使用

	<Fragment><Fragment>，可以添加key属性
	<></>				不可以添加key属性

## 作用

> 可以不用必须有一个真实的DOM根标签了



<hr/>

# Context

## 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

## 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

## 注意

	在应用开发中一般不用context, 一般都用它的封装react插件



<hr/>


#  组件优化

## Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
>
> 2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

## 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

## 原因

>  Component中的shouldComponentUpdate()总是返回true

## 解决

	办法1: 
		重写shouldComponentUpdate(nextProps,nextState)方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化



<hr/>

#  render props

## 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

## children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

## render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 
	在A组件内部预留位置，但放入的结构不确定



<hr/>

# 错误边界

## 理解：

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

## 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

## 使用方式：放在APP中

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
    //info:发生错误的地点
    //error:错误的信息
}
```

#  组件通信方式总结

## 组件间的关系：

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

## 几种通信方式：

		1.props：
			(1).children props
			(2).render props
		2.消息订阅-发布：
			pubs-sub、event等等
		3.集中式管理：
			redux、dva等等
		4.conText:
			生产者-消费者模式

## 比较好的搭配方式：

		父子组件：props
		兄弟组件：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)

# <img src="https://ftp.bmp.ovh/imgs/2022/02/f86f98dd6ff7d01b.png" style="width:50%;margin-left:50%;transform:translateX(-50%)" />

# React Router 6

## 1.概述

1. React Router 以三个不同的包发布到 npm 上，它们分别为：

   1. react-router: 路由的核心库，提供了很多的：组件、钩子。
   2. <strong style="color:#dd4d40">**react-router-dom:**</strong > <strong style="color:#dd4d40">包含react-router所有内容，并添加一些专门用于 DOM 的组件，例如 `<BrowserRouter>`等 </strong>。
   3. react-router-native: 包括react-router所有内容，并添加一些专门用于ReactNative的API，例如:`<NativeRouter>`等。

2. 与React Router 5.x 版本相比，改变了什么？

   1. 内置组件的变化：移除`<Switch/>` ，新增 `<Routes/>`等。

   2. 语法的变化：`component={About}` 变为 `element={<About/>}`等。

   3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`等。

   4. <strong style="color:#dd4d40">官方明确推荐函数式组件了！！！</strong>

      ......

## 2.Component

### 1. `<BrowserRouter>`

1. 说明：`<BrowserRouter> `用于包裹整个应用。

2. 示例代码：

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import { BrowserRouter } from "react-router-dom";
   
   ReactDOM.render(
     <BrowserRouter>
       {/* 整体结构（通常为App组件） */}
     </BrowserRouter>,root
   );
   ```

### 2. `<HashRouter>`

1. 说明：作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注：6.x版本中`<HashRouter>`、`<BrowserRouter> ` 的用法与 5.x 相同。

### 3. `<Routes/> 与 <Route/>`

1. v6版本中移出了先前的`<Switch>`，引入了新的替代者：`<Routes>`。

2. `<Routes>` 和 `<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。

3. `<Route>` 相当于一个 if 语句，如果其路径与当前 URL 匹配，则呈现其对应的组件。

4. `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）。

5. 当URL发生变化时，`<Routes> `都会查看其所有子` <Route>` 元素以找到最佳匹配并呈现组件 。

6. `<Route>` 也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由。

7. 示例代码：

   ```jsx
   <Routes>
       /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
       <Route path="/login" element={<Login />}></Route>
   
   		/*用于定义嵌套路由，home是一级路由，对应的路径/home*/
       <Route path="home" element={<Home />}>
          /*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/
         <Route path="test1" element={<Test/>}></Route>
         <Route path="test2" element={<Test2/>}></Route>
   		</Route>
   	
   		//Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx
       <Route path="users">
          <Route path="xxx" element={<Demo />} />
       </Route>
   </Routes>
   ```

### 4. `<Link>`

1. 作用: 修改URL，且不发送网络请求（路由链接）。

2. 注意: 外侧需要用`<BrowserRouter>`或`<HashRouter>`包裹。

3. 示例代码：

   ```jsx
   import { Link } from "react-router-dom";
   
   function Test() {
     return (
       <div>
       	<Link to="/路径">按钮</Link>
       </div>
     );
   }
   ```

### 5. `<NavLink>`

1. 作用: 与`<Link>`组件类似，且可实现导航的“高亮”效果。

2. 示例代码：

   ```jsx
   // 注意: NavLink默认类名是active，下面是指定自定义的class
   
   //自定义样式
   <NavLink
       to="login"
       className={({ isActive }) => {
           console.log('home', isActive)
           return isActive ? 'base one' : 'base'
       }}
   >login</NavLink>
   
   /*
   	默认情况下，当Home的子组件匹配成功，Home的导航也会高亮，
   	当NavLink上添加了end属性后，若Home的子组件匹配成功，则Home的导航没有高亮效果。
   */
   <NavLink to="home" end >home</NavLink>
   ```

### 6. `<Navigate>`

1. 作用：只要`<Navigate>`组件被渲染，就会修改路径，切换视图。

2. `replace`属性用于控制跳转模式（push 或 replace，默认是push）。

3. 示例代码：

   ```jsx
   import React,{useState} from 'react'
   import {Navigate} from 'react-router-dom'
   
   export default function Home() {
   	const [sum,setSum] = useState(1)
   	return (
   		<div>
   			<h3>我是Home的内容</h3>
   			{/* 根据sum的值决定是否切换视图 */}
   			{sum === 1 ? <h4>sum的值为{sum}</h4> : <Navigate to="/about" replace={true}/>}
   			<button onClick={()=>setSum(2)}>点我将sum变为2</button>
   		</div>
   	)
   }
   ```

### 7. `<Outlet>`

1. 当`<Route>`产生嵌套时，渲染其对应的后续子路由。

2. 示例代码：

   ```jsx
   //根据路由表生成对应的路由规则
   const element = useRoutes([
     {
       path:'/about',
       element:<About/>
     },
     {
       path:'/home',
       element:<Home/>,
       children:[
         {
           path:'news',
           element:<News/>
         },
         {
           path:'message',
           element:<Message/>,
         }
       ]
     }
   ])
   
   //Home.js
   import React from 'react'
   import {NavLink,Outlet} from 'react-router-dom'
   
   export default function Home() {
   	return (
   		<div>
   			<h2>Home组件内容</h2>
   			<div>
   				<ul className="nav nav-tabs">
   					<li>
   						<NavLink className="list-group-item" to="news">News</NavLink>
   					</li>
   					<li>
   						<NavLink className="list-group-item" to="message">Message</NavLink>
   					</li>
   				</ul>
   				{/* 指定路由组件呈现的位置 */}
   				<Outlet />
   			</div>
   		</div>
   	)
   }
   
   ```

## 3.Hooks

### 1. useRoutes()

1. 作用：根据路由表，动态创建`<Routes>`和`<Route>`。

2. 示例代码：

   ```jsx
   //路由表配置：src/routes/index.js
   import About from '../pages/About'
   import Home from '../pages/Home'
   import {Navigate} from 'react-router-dom'
   
   export default [
   	{
   		path:'/about',
   		element:<About/>
   	},
   	{
   		path:'/home',
   		element:<Home/>
   	},
   	{
   		path:'/',
   		element:<Navigate to="/about"/>
   	}
   ]
   
   //App.jsx
   import React from 'react'
   import {NavLink,useRoutes} from 'react-router-dom'
   import routes from './routes'
   
   export default function App() {
   	//根据路由表生成对应的路由规则
   	const element = useRoutes(routes)
   	return (
   		<div>
   			......
         {/* 注册路由 */}
         {element}
   		  ......
   		</div>
   	)
   }
   
   ```

### 2. useNavigate()

1. 作用：返回一个函数用来实现编程式导航。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useNavigate} from 'react-router-dom'
   
   export default function Demo() {
     const navigate = useNavigate()
     const handle = () => {
       //第一种使用方式：指定具体的路径
       navigate('/login', {
         replace: false,
         state: {a:1, b:2}
       }) 
       //第二种使用方式：传入数值进行前进或后退，类似于5.x中的 history.go()方法
       navigate(-1)
     }
     
     return (
       <div>
         <button onClick={handle}>按钮</button>
       </div>
     )
   }
   ```

### 3. useParams()

1. 作用：回当前匹配路由的`params`参数，类似于5.x中的`match.params`。

2. 示例代码：

   ```jsx
   import React from 'react';
   import { Routes, Route, useParams } from 'react-router-dom';
   import User from './pages/User.jsx'
   
   function ProfilePage() {
     // 获取URL中携带过来的params参数
     let { id } = useParams();
   }
   
   function App() {
     return (
       <Routes>
         <Route path="users/:id" element={<User />}/>
       </Routes>
     );
   }
   ```

### 4. useSearchParams()

1. 作用：用于读取和修改当前位置的 URL 中的查询字符串。

2. 返回一个包含两个值的数组，内容分别为：当前的seaech参数、更新search的函数。

3. 示例代码：

   ```jsx
   import React from 'react'
   import {useSearchParams} from 'react-router-dom'
   
   export default function Detail() {
   	const [search,setSearch] = useSearchParams()
   	const id = search.get('id')
   	const title = search.get('title')
   	const content = search.get('content')
   	return (
   		<ul>
   			<li>
   				<button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
   			</li>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   
   ```

### 5. useLocation()

1. 作用：获取当前 location 信息，对标5.x中的路由组件的`location`属性。

2. 示例代码：

   ```jsx
   import React from 'react'
   import {useLocation} from 'react-router-dom'
   
   export default function Detail() {
   	const x = useLocation()
   	console.log('@',x)
     // x就是location对象: 
   	/*
   		{
         hash: "",
         key: "ah9nv6sz",
         pathname: "/login",
         search: "?name=zs&age=18",
         state: {a: 1, b: 2}
       }
   	*/
   	return (
   		<ul>
   			<li>消息编号：{id}</li>
   			<li>消息标题：{title}</li>
   			<li>消息内容：{content}</li>
   		</ul>
   	)
   }
   
     
   
   
   ```

### 6. useMatch()

1. 作用：返回当前匹配信息，对标5.x中的路由组件的`match`属性。

2. 示例代码：

   ```jsx
   <Route path="/login/:page/:pageSize" element={<Login />}/>
   <NavLink to="/login/1/10">登录</NavLink>
   
   export default function Login() {
     const match = useMatch('/login/:x/:y')
     console.log(match) //输出match对象
     //match对象内容如下：
     /*
     	{
         params: {x: '1', y: '10'}
         pathname: "/LoGin/1/10"  
         pathnameBase: "/LoGin/1/10"
         pattern: {
         	path: '/login/:x/:y', 
         	caseSensitive: false, 
         	end: false
         }
       }
     */
     return (
     	<div>
         <h1>Login</h1>
       </div>
     )
   }
   ```

### 7. useInRouterContext()

​			作用：如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext` 钩子返回 true，否则返回 false。

### 8. useNavigationType()

1. 作用：返回当前的导航类型（用户是如何来到当前页面的）。
2. 返回值：`POP`、`PUSH`、`REPLACE`。
3. 备注：`POP`是指在浏览器中直接打开了这个路由组件（刷新页面）。

### 9. useOutlet()

1. 作用：用来呈现当前组件中渲染的嵌套路由。

2. 示例代码：

   ```jsx
   const result = useOutlet()
   console.log(result)
   // 如果嵌套路由没有挂载,则result为null
   // 如果嵌套路由已经挂载,则展示嵌套的路由对象
   ```

### 10.useResolvedPath()

1. 作用：给定一个 URL值，解析其中的：path、search、hash值。

