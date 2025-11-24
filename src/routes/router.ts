import { createBrowserRouter } from "react-router"
import Login from "../pages/login/Login"
import { AdminLayout } from "@/components/Layout"
import { userInfoLoader } from "@/routes/loader"
import Home from "@/pages/home/Home"

const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    id: "root",
    // 用于验证当前是否登录，如未登录则直接跳转到login页面
    loader: userInfoLoader,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/404",
    Component: Login,
  },
])

export default router
