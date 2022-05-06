import React, { useState } from "react";
const Child = () => {
  const [users] = useState("abc");
  return (
    <div>
      <h2>子组件</h2>
      {users.map((obj) => {
        return <h4>{obj}</h4>;
      })}
    </div>
  );
};
export default Child
