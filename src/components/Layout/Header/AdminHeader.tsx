import { type FC } from "react"
import { Flex } from "antd"
import { usePrefixCls } from "@/hooks/usePrefixCls"
import "./AdminHeader.less"

const AdminHeader: FC = () => {
  const prefixCls = usePrefixCls("header")
  return (
    <Flex justify={"space-between"} align={"center"} className={`${prefixCls}`}>
      <Flex>MyLogo</Flex>
      <Flex>MyName</Flex>
    </Flex>
  )
}

export default AdminHeader
