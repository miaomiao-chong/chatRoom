import { Navigate } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import BossInfo from "../views/bossInfo";
import Chat from "../views/chat";
import Login from "../views/login";
import Register from "../views/register";
import SeekerInfo from "../views/seekerInfo";
import Boss from "../views/boss";
import Seeker from "../views/seeker";
import User from "../views/user";
import NotFound from "../views/404/NotFound";
// import Home from "../views/home";
// https://zhuanlan.zhihu.com/p/555189442
// https://juejin.cn/post/7148102355945750564
let routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <DashBoard />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    meta: {
      title: "注册",
    },
    element: <Register />,
  },

  {
    path: "/bossInfo",
    element: <BossInfo />,
    meta: {
      title: "boss列表",
      isLogin: true,
      role: ["boss"],
    },
  },
  {
    path: "/seekerInfo",
    element: <SeekerInfo />,
    name: "seekerInfo",
    meta: {
      title: "求职者列表",
      isLogin: true,
      role: ["seeker"],
    },
  },
  {
    path: "/chat/:user",
    element: <DashBoard />,
    children: [
      {
        path: "index",
        element: <Chat />,
        meta: {
          title: "求职者列表",
          isLogin: true,
          role: ["seeker", "boss"],
        },
      },
    ],
  },
  {
    path: "/boss",
    element: <Navigate to="/boss/index" />,
  },
  {
    path: "/boss",
    element: <DashBoard />,
    children: [
      {
        index: true,
        path: "index",
        element: <Boss />,
        meta: {
          title: "boss列表",
          isLogin: true,
          role: ["boss"],
        },
      },
    ],
  },
  {
    path: "seeker",
    element: <Navigate to="/seeker/index" />,
  },
  {
    path: "/seeker",
    element: <DashBoard />,
    children: [
      {
        path: "index",
        element: <Seeker />,
        meta: {
          title: "求职者列表",
          isLogin: true,
          role: ["seeker"],
        },
      },
    ],
  },
  {
    path: "/user",
    element: <Navigate to="/user/index" />,
  },
  {
    path: "/user",
    element: <DashBoard />,
    children: [
      {
        path: "index",
        element: <User />,
        meta: {
          title: "用户中心",
          isLogin: true,
          role: ["boss", "seeker"],
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default routes;
