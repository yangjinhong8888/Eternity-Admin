import { type FC, useContext } from "react"
import { CssContext } from "@/config/context.tsx"
import "./Login.less"
import { Button, Form, type FormProps, Input } from "antd"

const Login: FC = () => {
  type FieldType = {
    username: string
    password: string
  }

  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls("login-page")

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    console.log("Success:", values)
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-container-card`}>
          <div className={`${prefixCls}-container-card-title`}>用户登录</div>
          <Form<FieldType>
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              className={`${prefixCls}-container-card-submit`}
            >
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
