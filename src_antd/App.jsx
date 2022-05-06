import React, { Component } from 'react';
import { Button } from 'antd';
import {StepForwardOutlined} from '@ant-design/icons';
class App extends Component {
  render() {
    return (
      <div>
        <Button type="primary">Primary Button</Button>
        <StepForwardOutlined />
      </div>
    );
  }
}

export default App;