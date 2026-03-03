import { type FC } from "react"
import { Flex } from "antd"
import { usePrefixCls } from "@/hooks/usePrefixCls"
import "./AdminFooter.less"

const AdminFooter: FC = () => {
  const prefixCls = usePrefixCls("footer")

  return (
    <Flex
      vertical={true}
      justify={"center"}
      align={"center"}
      className={`${prefixCls}`}
    >
      <Flex>Footer</Flex>
      <Flex>Footer</Flex>
    </Flex>
  )
}

export default AdminFooter
