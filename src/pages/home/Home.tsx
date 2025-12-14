import { type FC } from "react"
import { useRouteLoaderData } from "react-router"
import { usePrefixCls } from "@/hooks/usePrefixCls"
import "./Home.less"

const Home: FC = () => {
  const prefixCls = usePrefixCls("home-page")
  const userInfo = useRouteLoaderData("root")

  return (
    <div className={`${prefixCls}`}>
      <div>Hello, Eternity Admin!</div>
      <div>{userInfo?.username}</div>
    </div>
  )
}

export default Home
