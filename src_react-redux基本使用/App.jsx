import React, { Component } from 'react';
import Count from './containers/Count'
//引入redux,store
import store from './redux/store'
class App extends Component {
  render() {
    return (
      <div>  
        <Count store={store}/>    
      </div>
    );
  }
}

export default App;