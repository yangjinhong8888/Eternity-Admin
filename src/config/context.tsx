import * as React from "react"

export interface CssConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
}
const defaultGetPrefixCls = (suffixCls?: string) => {
  return suffixCls ? `eternity-admin-${suffixCls}` : "eternity-admin"
}

export const CssContext = React.createContext<CssConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
})
