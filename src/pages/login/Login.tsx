import { type FC, useContext } from "react"
import { CssContext } from "@/store/context/CssPrefixContext.tsx"
import "./Login.less"
import { Button, Form, type FormProps, Input } from "antd"
import { userService } from "@/services/userService.ts"
import { useNavigate } from "react-router"

interface LoginInfo {
  username: string
  password: string
}

const Login: FC = () => {
  // 获取css前缀
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls("login-page")

  const navigate = useNavigate();
  const onFinish: FormProps<LoginInfo>["onFinish"] = values => {
    console.log("Success:", values)
    userService
      .login({ username: values.username, password: values.password })
      .then(res => {
        navigate("/");
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
