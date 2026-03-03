import { useEffect, useMemo, useState, type FC } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { Layout, Menu } from "antd"
import { usePrefixCls } from "@/hooks/usePrefixCls"
import {
  getMenuPathByKey,
  getMenuStateByPath,
  menuItems,
} from "@/config/menu/menuConfig"
import { getBelowBreakpointQuery } from "@/config/antd/breakpoints"
import AdminHeader from "@/components/Layout/Header/AdminHeader"
import AdminFooter from "@/components/Layout/Footer/AdminFooter"
import "./AdminLayout.less"

const { Header, Content, Footer, Sider } = Layout
const LG_DOWN_MEDIA_QUERY = getBelowBreakpointQuery("lg")

const getInitialCollapsed = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia(LG_DOWN_MEDIA_QUERY).matches
}

const AdminLayout: FC = () => {
  const prefixCls = usePrefixCls("layout")
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState<boolean>(getInitialCollapsed)
  const menuState = useMemo(
    () => getMenuStateByPath(location.pathname),
    [location.pathname]
  )
  const [openKeys, setOpenKeys] = useState<string[]>(menuState.openKeys)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(LG_DOWN_MEDIA_QUERY)
    const handleChange = (event: MediaQueryListEvent) => {
      setSidebarCollapsed(event.matches)
    }

    setSidebarCollapsed(mediaQueryList.matches)
    mediaQueryList.addEventListener("change", handleChange)

    return () => {
      mediaQueryList.removeEventListener("change", handleChange)
    }
  }, [])

  useEffect(() => {
    setOpenKeys(menuState.openKeys)
  }, [menuState.openKeys])

  return (
    <Layout className={`${prefixCls}`}>
      <Sider
        className={`${prefixCls}-sider`}
        collapsible
        collapsedWidth={80}
        collapsed={sidebarCollapsed}
        onCollapse={value => setSidebarCollapsed(value)}
      >
        <div className={`${prefixCls}-sider-logo`}></div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={menuState.selectedKeys}
          openKeys={openKeys}
          onOpenChange={keys => setOpenKeys(keys as string[])}
          onClick={({ key }) => {
            const targetPath = getMenuPathByKey(String(key))
            if (targetPath && targetPath !== location.pathname) {
              navigate(targetPath)
            }
          }}
          items={menuItems}
        />
      </Sider>
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
