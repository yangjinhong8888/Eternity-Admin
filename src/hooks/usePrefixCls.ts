import { useContext } from "react"
import { CssContext } from "@/store/context/CssPrefixContext"

/**
 * 自定义Hook：获取带前缀的CSS类名
 * 简化重复的Context调用代码
 *
 * @param suffix - CSS类名后缀，例如 "login-page"
 * @returns 完整的带前缀CSS类名，例如 "eternity-admin-login-page"
 *
 * @example
 * ```tsx
 * const prefixCls = usePrefixCls("login-page")
 * // 返回: "eternity-admin-login-page"
 * ```
 */
export const usePrefixCls = (suffix: string): string => {
  const { getPrefixCls } = useContext(CssContext)
  return getPrefixCls(suffix)
}
