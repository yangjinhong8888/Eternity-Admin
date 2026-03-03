import { createBrowserRouter } from "react-router"
import { AdminLayout } from "@/components/Layout"
import Home from "@/pages/home/Home"
import Login from "@/pages/login/Login"
import NotFound from "@/pages/notfound/NotFound"
import CreatePage from "@/pages/create"
import ArticlesPage from "@/pages/manage/articles"
import TagsPage from "@/pages/manage/tags"
import { userInfoLoader } from "@/routes/loader"

const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    id: "root",
    loader: userInfoLoader,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "create",
        Component: CreatePage,
      },
      {
        path: "manage/articles",
        Component: ArticlesPage,
      },
      {
        path: "manage/tags",
        Component: TagsPage,
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
