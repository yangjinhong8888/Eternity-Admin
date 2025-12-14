import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { ConfigProvider } from "antd"
import "@ant-design/v5-patch-for-react-19"
import "@/assets/styles/common.less"
import router from "@/routes/router"
import { themeConfig } from "@/config/antd/themeConfig"

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={themeConfig}>
    <RouterProvider router={router} />
  </ConfigProvider>
)
