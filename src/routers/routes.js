import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Message from "../pages/Home/Message";
import News from "../pages/Home/News";
import Detail from "../pages/Home/Message/Detail";
//创建路由表
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "message",
        element: <Message />,
        children: [
          {
              //params参数
            // path: "detail/:id/:title",
            //search参数
            path:"detail",
            element: <Detail />,
          },
        ],
      },
      {
        path: "news",
        element: <News />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/home/news" />,
  },
];
