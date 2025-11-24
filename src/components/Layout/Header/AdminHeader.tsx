import "./AdminHeader.less"
import { Flex } from "antd"
import { type FC, useContext } from "react"
import { CssContext } from "@/store/context/CssPrefixContext"

const AdminHeader: FC = () => {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls("header")
  return (
    <Flex justify={"space-between"} align={"center"} className={`${prefixCls}`}>
      <Flex>MyLogo</Flex>
      <Flex>MyName</Flex>
    </Flex>
  )
}

export default AdminHeader
