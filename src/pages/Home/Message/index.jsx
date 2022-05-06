import React, { useState } from "react";
import { Link, Outlet,useNavigate } from "react-router-dom";
export default function Message() {
  const [messages] = useState([
    { id: "01", title: "消息1" },
    { id: "02", title: "消息2" },
    { id: "03", title: "消息3" },
  ]);
  const navigate = useNavigate()
  const showDeatil = (item)=>{
    // navigate('/about')
    navigate('detail',{
      replace:true,
      state:{
        id:item.id,
        title:item.title
      }
    })
  }
  return (
    <div>
      Message
      <ul>
        {messages.map((item) => {
          return (
            <li key={item.id}>
              {/* params参数 */}
              {/* <Link to={`detail/${item.id}/${item.title}`}>{item.title}</Link> */}
              
              
              {/* search参数 */}
              {/* <Link to={`detail?id=${item.id}&title=${item.title}`}>{item.title}</Link> */}

              {/* state参数 */}
              <Link to="detail" state={{id:item.id,title:item.title}}>{item.title}</Link>
              <button onClick={()=>showDeatil(item)}>编程式导航</button>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
