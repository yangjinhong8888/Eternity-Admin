import * as React from "react";
import "./AdminFooter.less";
import {Flex} from "antd";


const AdminFooter: React.FC = () => {
  return (
    <Flex vertical={true} justify={"center"} align={"center"} className={"admin-footer"}>
      <Flex>Footer</Flex>
      <Flex>Footer</Flex>
    </Flex>
  )
}

export default AdminFooter
