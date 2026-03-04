import type React from "react"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { type MenuProps } from "antd"

/**
 * 菜单项类型定义
 */
export type MenuItem = Required<MenuProps>["items"][number]

/**
 * 菜单配置项接口
 */
export interface MenuConfig {
  label: string
  key: string
  icon?: React.ReactNode
  path?: string
  children?: MenuConfig[]
}

interface MenuNodeMeta {
  key: string
  path?: string
  parentKeys: string[]
}

/**
 * 创建菜单项的辅助函数
 */
export const createMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

/**
 * 菜单配置数据
 * 可根据实际需要扩展，支持路由路径、权限控制等
 */
export const menuConfigData: MenuConfig[] = [
  {
    label: "仪表盘",
    key: "1",
    icon: <PieChartOutlined />,
    path: "/",
  },
  {
    label: "创作",
    key: "2",
    icon: <DesktopOutlined />,
    path: "/create",
  },
  {
    label: "管理",
    key: "sub1",
    icon: <UserOutlined />,
    children: [
      {
        label: "文章管理",
        key: "3",
        path: "/manage/articles",
      },
      {
        label: "标签管理",
        key: "4",
        path: "/manage/tags",
      },
      {
        label: "用户管理",
        key: "5",
        path: "/manage/users",
      },
    ],
  },
  {
    label: "权限",
    key: "sub2",
    icon: <TeamOutlined />,
    children: [
      {
        label: "用户权限",
        key: "6",
        path: "/permission/users",
      },
      {
        label: "菜单权限",
        key: "8",
        path: "/permission/menus",
      },
    ],
  },
  {
    label: "系统",
    key: "9",
    icon: <FileOutlined />,
    path: "/system",
  },
]

/**
 * 将菜单配置转换为Ant Design Menu组件所需的items格式
 */
export const transformMenuConfig = (configs: MenuConfig[]): MenuItem[] => {
  return configs.map(config => {
    const children = config.children
      ? transformMenuConfig(config.children)
      : undefined

    return createMenuItem(config.label, config.key, config.icon, children)
  })
}

/**
 * 导出转换后的菜单项
 */
export const menuItems: MenuItem[] = transformMenuConfig(menuConfigData)

const isPathMatched = (pathname: string, menuPath: string): boolean => {
  if (menuPath === "/") return pathname === "/"
  return pathname === menuPath || pathname.startsWith(`${menuPath}/`)
}

const collectMenuNodeMeta = (
  configs: MenuConfig[],
  parentKeys: string[] = []
): MenuNodeMeta[] => {
  return configs.flatMap(config => {
    const currentMeta: MenuNodeMeta = {
      key: config.key,
      path: config.path,
      parentKeys,
    }

    const childMeta = config.children
      ? collectMenuNodeMeta(config.children, [...parentKeys, config.key])
      : []

    return [currentMeta, ...childMeta]
  })
}

const menuNodeMetaList = collectMenuNodeMeta(menuConfigData)
const menuPathMap = new Map(
  menuNodeMetaList
    .filter(meta => Boolean(meta.path))
    .map(meta => [meta.key, meta.path as string])
)

export const getMenuPathByKey = (key: string): string | undefined => {
  return menuPathMap.get(key)
}

export const getMenuStateByPath = (
  pathname: string
): { selectedKeys: string[]; openKeys: string[] } => {
  const matched = menuNodeMetaList
    .filter(meta => meta.path && isPathMatched(pathname, meta.path))
    .sort((a, b) => (b.path?.length ?? 0) - (a.path?.length ?? 0))[0]

  if (!matched) {
    return {
      selectedKeys: [],
      openKeys: [],
    }
  }

  return {
    selectedKeys: [matched.key],
    openKeys: matched.parentKeys,
  }
}
