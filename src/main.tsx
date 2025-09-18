import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import router from "./config/router.tsx"
import "@ant-design/v5-patch-for-react-19"
import "@assets/styles/common.less"
import { ConfigProvider } from "antd"
import { themeConfig } from "./config/themeConfig.tsx"

createRoot(document.getElementById("root")!).render(
  <ConfigProvider theme={themeConfig}>
    <RouterProvider router={router} />
  </ConfigProvider>
)
