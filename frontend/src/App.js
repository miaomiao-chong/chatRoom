// import React, { memo } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import DashBoard from "./views/DashBoard";
import { Outlet } from "react-router-dom";
import routes from "./router/index";

// // https://juejin.cn/post/7159776565759311908 路由拦截参考
// // 公共页面： 登录 注册
// // 角色：seeker / boss
// /**
//  * 获取token
//  *     token存在
//  *        是login ->重定向到主页
//  *        不是login 判断角色 -> seeker/boss页面拦截
//  *     token不存在
//  *        是注册/登录页  -> 可访问
//  *        不是登录/注册页  -> 到登录页
//  */

// import BossInfo from "./views/bossInfo";
// import Chat from "./views/chat";
// import Login from "./views/login";
// import Register from "./views/register";
// import SeekerInfo from "./views/seekerInfo";
// import Boss from "./views/boss";
// import Seeker from "./views/seeker";
// import User from "./views/user";
// import NotFound from "./views/404/NotFound";

// const App = memo(() => {
//   return (
//     // <Routes>
//     //   <Route path="/" element={<Navigate to="/boss"></Navigate>}></Route>
//     //   <Route path="/login" element={<Login />}></Route>
//     //   <Route path="/register" element={<Register />}></Route>
//     //   <Route path="/bossInfo" element={<BossInfo />}></Route>
//     //   <Route path="/seekerInfo" element={<SeekerInfo />}></Route>
//     //   <Route path="/chat:user" element={<Chat />}></Route>
//     //   <Route element={<DashBoard />}>
//     //     <Route path="/boss" element={<Boss />}></Route>
//     //     <Route path="/seeker" element={<Seeker />}></Route>
//     //     <Route path="/user" element={<User />}></Route>
//     //   </Route>
//     //   <Route path="*" element={<NotFound />}></Route>
//     // </Routes>
//     111
//   );
// });

// export default App;

import React, { memo } from "react";
import { useRoutes } from "react-router-dom";

const App = memo(() => {
  return <div>{useRoutes(routes)}</div>;
});

export default App;
