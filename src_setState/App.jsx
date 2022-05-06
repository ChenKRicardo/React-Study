import React, { Component } from 'react';
import Demo from './components/setState'
class App extends Component {
  render() {
    return (
      <div>    
        <Demo x={100}/>
      </div>
    );
  }
}

export default App;