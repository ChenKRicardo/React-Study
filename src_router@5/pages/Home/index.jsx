import React, { Component } from "react";
import MyNavLink from "../../components/MyNavLink";
import { Switch,Redirect } from "react-router-dom";
import News from "./News";
import Message from "./Message";
class Home extends Component {
  render() {
    return (
      <div>
        <h3>Home内容</h3>
        <div>
          <ul className="nav nav-tabs">
            <li>
              <MyNavLink to="/home/news">News</MyNavLink>
            </li>
            <li>
              <MyNavLink to="/home/message">Message</MyNavLink>
            </li>
          </ul>
          <Switch>
            <News path="/home/news" component={News}/>
            <Message path="/home/message" component={Message}/>
            <Redirect to="/home/news"/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Home;
