import { createBrowserRouter } from "react-router"
import Home from "../pages/home/Home.tsx"
import Login from "../pages/login/Login.tsx"
import { AdminLayout } from "../component/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
])

export default router
