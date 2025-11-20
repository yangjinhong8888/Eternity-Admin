import "./Home.less"
import { type FC, useContext } from "react"
import { CssContext } from "@/store/context/CssPrefixContext.tsx"

const Home: FC = () => {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls("home-page")
  return (
    <div className={`${prefixCls}`}>
      <div>Hello, Eternity Admin!</div>
      <div></div>
    </div>
  )
}

export default Home
