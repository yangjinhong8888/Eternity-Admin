import { Button, Result } from "antd"
import { useNavigate } from "react-router"

/**
 * 404 Not Found 页面组件
 */
const NotFound = () => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate("/")
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button type="primary" onClick={handleBackHome}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
