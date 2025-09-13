import * as React from "react";
import "./AdminHeader.less";
import {Flex} from "antd";
import {useContext} from "react";
import {CssContext} from "../../../config/context.tsx";

const AdminHeader: React.FC = () => {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls('header');
  return (
    <Flex justify={"space-between"} align={"center"} className={`${prefixCls}`}>
      <Flex>MyLogo</Flex>
      <Flex>MyName</Flex>
    </Flex>
  )
}

export default AdminHeader
