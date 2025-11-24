import { createBrowserRouter } from "react-router"
import Home from "../pages/home/Home.tsx"
import Login from "../pages/login/Login.tsx"
import { AdminLayout } from "../component/Layout"
import { userInfoLoader } from "@/routes/loader.ts"

const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        index: true,
        element: <Home />,
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
