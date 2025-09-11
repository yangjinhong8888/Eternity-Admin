import {Outlet} from "react-router";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';
import {Grid, Layout, Menu, type MenuProps} from 'antd';
import * as React from "react";
import {useState, useEffect, useRef} from "react";
import "./AdminLayout.less";
import AdminHeader from "./Header/AdminHeader.tsx";
import AdminFooter from "./Footer/AdminFooter.tsx";

const {Header, Content, Footer, Sider} = Layout;
type MenuItem = Required<MenuProps>['items'][number];


const AdminLayout: React.FC = () => {
  const {lg} = Grid.useBreakpoint();
  const [sidebarCollapsed, setSideBarCollapsed] = useState<boolean>(!lg); // 默认收起侧边栏
  const isInitialBreakpoint = useRef(true);   // 记录是否是第一次加载断点，避免初始化时lg为undefined导致的Sider闪烁

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('仪表盘', '1', <PieChartOutlined/>),
    getItem('创作', '2', <DesktopOutlined/>),
    getItem('管理', 'sub1', <UserOutlined/>,
      [
        getItem('文章管理', '3'),
        getItem('标签管理', '4'),
        getItem('用户管理', '5'),
      ]),
    getItem('权限', 'sub2', <TeamOutlined/>,
      [
        getItem('用户权限', '6'),
        getItem('菜单权限', '8')
      ]),
    getItem('系统', '9', <FileOutlined/>)
  ];

  useEffect(() => {
    setSideBarCollapsed(!lg);
    /**
     * setTimeout(fn, 0) 会将回调函数 fn 放入 事件循环队列 的末尾，等待当前同步代码和微任务队列（如 React 的渲染、useEffect 等）执行完成后才执行。
     * 利用事件循环的延迟，让关键标记（isInitialBreakpoint.current）在副作用的最后阶段更新。
     */
    if(isInitialBreakpoint.current){
      setTimeout(()=>{
        isInitialBreakpoint.current = false; // setTimeout将操作推迟到下一个事件循环，确保在当前渲染周期完成后再更新这个标志位，避免出现不必要的状态切换
      }, 0)
    }
  }, [lg]);

  return (
    <Layout className={"admin-layout"}>
      {
        lg !== undefined &&
        <Sider
          className={"sidebar"}
          collapsible
          collapsedWidth={80}
          collapsed={isInitialBreakpoint.current ? !lg : sidebarCollapsed}
          onCollapse={(value) => setSideBarCollapsed(value)}
        >
          <div className={'logo'}></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[items[0]?.key as string]} items={items}/>
        </Sider>
      }
      <Layout className={"content-layout"}>
        <Header className={"header"}>
          <AdminHeader/>
        </Header>
        <Content className={"content"}>
          <Outlet/>
        </Content>
        <Footer className={"footer"}>
          <AdminFooter/>
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout;