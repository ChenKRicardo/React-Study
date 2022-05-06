import React from "react";
//params参数
// import {useParams} from 'react-router-dom'
//search参数
// import {useSearchParams} from 'react-router-dom'
//state参数
import { useLocation } from "react-router-dom";
export default function Detail() {
  //search参数
  // const [search,setSearch] = useSearchParams()
  // const id =search.get('id');
  // const title =search.get('title');
  //state参数
  const {state:{id,title}} = useLocation();
  return (
    <div>
      <h4>
        {id}---{title}
      </h4>
    </div>
  );
}
