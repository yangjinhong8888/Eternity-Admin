import { createBrowserRouter } from "react-router"
import { AdminLayout } from "@/components/Layout"
import Home from "@/pages/home/Home"
import Login from "@/pages/login/Login"
import NotFound from "@/pages/notfound/NotFound"
import { userInfoLoader } from "@/routes/loader"

const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    id: "root",
    // 用于验证当前是否登录，如未登录则直接跳转到login页面，放在需要访问的根拦截
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
    Component: NotFound,
  },
  {
    path: "*",
    Component: NotFound,
  },
])

export default router
