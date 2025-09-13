import * as React from "react";
import "./AdminFooter.less";
import {Flex} from "antd";
import {useContext} from "react";
import {CssContext} from "../../../config/context.tsx";


const AdminFooter: React.FC = () => {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls('footer');

  return (
    <Flex vertical={true} justify={"center"} align={"center"} className={`${prefixCls}`}>
      <Flex>Footer</Flex>
      <Flex>Footer</Flex>
    </Flex>
  )
}

export default AdminFooter
