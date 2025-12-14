import { createContext } from "react"

export interface CssConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
}

const defaultGetPrefixCls = (suffixCls?: string) => {
  return suffixCls ? `eternity-admin-${suffixCls}` : "eternity-admin"
}

// 不使用Provider包裹，作为全局常量容器使用
export const CssContext = createContext<CssConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
})
