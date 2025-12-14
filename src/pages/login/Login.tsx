import { type FC } from "react"
import { Button, Form, type FormProps, Input } from "antd"
import { useNavigate } from "react-router"
import { usePrefixCls } from "@/hooks/usePrefixCls"
import { userService } from "@/services/userService"
import "./Login.less"

interface LoginInfo {
  username: string
  password: string
}

const Login: FC = () => {
  const prefixCls = usePrefixCls("login-page")

  const navigate = useNavigate()
  const onFinish: FormProps<LoginInfo>["onFinish"] = values => {
    console.log("Success:", values)
    userService
      .login({ username: values.username, password: values.password })
      .then(res => {
        navigate("/")
        console.log("Success:", res)
      })
      .catch(error => {
        console.log("Error:", error)
      })
  }

  const onFinishFailed: FormProps<LoginInfo>["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-container-card`}>
          <div className={`${prefixCls}-container-card-title`}>用户登录</div>
          <Form<LoginInfo>
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<LoginInfo>
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<LoginInfo>
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
