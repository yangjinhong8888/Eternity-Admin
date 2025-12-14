import { useState, useEffect, useRef, type FC } from "react"
import { Outlet } from "react-router"
import { Grid, Layout, Menu } from "antd"
import { usePrefixCls } from "@/hooks/usePrefixCls"
import { menuItems } from "@/config/menu/menuConfig"
import AdminHeader from "@/components/Layout/Header/AdminHeader"
import AdminFooter from "@/components/Layout/Footer/AdminFooter"
import "./AdminLayout.less"

const { Header, Content, Footer, Sider } = Layout

const AdminLayout: FC = () => {
  const prefixCls = usePrefixCls("layout")

  const { lg } = Grid.useBreakpoint()
  const [sidebarCollapsed, setSideBarCollapsed] = useState<boolean>(!lg) // 默认收起侧边栏
  const isInitialBreakpoint = useRef(true) // 记录是否是第一次加载断点，避免初始化时lg为undefined导致的Sider闪烁

  useEffect(() => {
    setSideBarCollapsed(!lg)
    /**
     * setTimeout(fn, 0) 会将回调函数 fn 放入 事件循环队列 的末尾，等待当前同步代码和微任务队列（如 React 的渲染、useEffect 等）执行完成后才执行。
     * 利用事件循环的延迟，让关键标记（isInitialBreakpoint.current）在副作用的最后阶段更新。
     */
    if (isInitialBreakpoint.current) {
      setTimeout(() => {
        isInitialBreakpoint.current = false // setTimeout将操作推迟到下一个事件循环，确保在当前渲染周期完成后再更新这个标志位，避免出现不必要的状态切换
      }, 0)
    }
  }, [lg])

  return (
    <Layout className={`${prefixCls}`}>
      {lg !== undefined && (
        <Sider
          className={`${prefixCls}-sider`}
          collapsible
          collapsedWidth={80}
          collapsed={isInitialBreakpoint.current ? !lg : sidebarCollapsed}
          onCollapse={value => setSideBarCollapsed(value)}
        >
          <div className={`${prefixCls}-sider-logo`}></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[menuItems[0]?.key as string]}
            items={menuItems}
          />
        </Sider>
      )}
      <Layout className={`${prefixCls}-content`}>
        <Header className={`${prefixCls}-content-header`}>
          <AdminHeader />
        </Header>
        <Content className={`${prefixCls}-content-page`}>
          <Outlet />
        </Content>
        <Footer className={`${prefixCls}-content-footer`}>
          <AdminFooter />
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
