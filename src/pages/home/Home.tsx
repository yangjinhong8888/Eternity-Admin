import "./Home.less"
import { type FC, useContext } from "react"
import { CssContext } from "@/store/context/CssPrefixContext.tsx"
import { useLoaderData } from "react-router"

const Home: FC = () => {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls("home-page")
  const userInfo = useLoaderData()

  return (
    <div className={`${prefixCls}`}>
      <div>Hello, Eternity Admin!</div>
      <div>{userInfo.username}</div>
    </div>
  )
}

export default Home
