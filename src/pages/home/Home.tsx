import "./Home.less"
import { type FC, useContext } from "react"
import { CssContext } from "@/store/context/CssPrefixContext"
import { useRouteLoaderData } from "react-router"

const Home: FC = () => {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls("home-page")
  const userInfo = useRouteLoaderData("root")

  return (
    <div className={`${prefixCls}`}>
      <div>Hello, Eternity Admin!</div>
      <div>{userInfo?.username}</div>
    </div>
  )
}

export default Home
