import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { ConfigProvider } from "antd"
import { Provider } from "react-redux"
import "@ant-design/v5-patch-for-react-19"
import "@/assets/styles/common.less"
import router from "@/routes/router"
import { themeConfig } from "@/config/antd/themeConfig"
import { store } from "@/store/redux/store"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </Provider>
)
