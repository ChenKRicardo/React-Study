import React from "react";
import {NavLink,useRoutes} from "react-router-dom";
import Header from "./components/Header";
import routes from './routers/routes'
export default function App() {
  const computedClassName = ({isActive}) => {
    return isActive ? "list-group -item light" : "list-group -item";
  };
  const element = useRoutes(routes)
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            <Header />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* React中靠路由链接实现切换组件 */}
            <NavLink className={computedClassName} to="/home">
              Home
            </NavLink>
            <NavLink className={computedClassName} to="/about">
              About
            </NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 注册路由 */}
              {element}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
