import { createBrowserRouter } from "react-router"
import Login from "../pages/login/Login"
import { AdminLayout } from "@/components/Layout"
import { userInfoLoader } from "@/routes/loader"
import Home from "@/pages/home/Home"

const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: userInfoLoader,
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
