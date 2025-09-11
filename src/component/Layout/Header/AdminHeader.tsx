import * as React from "react";
import "./AdminHeader.less";
import {Flex} from "antd";

const AdminHeader: React.FC = () => {
  return (
    <Flex justify={"space-between"} align={"center"} className={"admin-header"}>
      <Flex>MyLogo</Flex>
      <Flex>MyName</Flex>
    </Flex>
  )
}

export default AdminHeader
