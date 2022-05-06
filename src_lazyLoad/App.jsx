import React, { Component, lazy, Suspense } from "react";
import { Link, Route, Switch } from "react-router-dom";
// import About from './pages/About'
// import Home from './pages/Home'
const Home = lazy(() => import("./pages/About"));
const About = lazy(() => import("./pages/Home"));
class App extends Component {
  render() {
    return (
      <div>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path="/home" component={About} />
            <Route path="/about" component={Home} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
