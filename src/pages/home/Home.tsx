import "./Home.less"
import { type FC, useContext, useEffect } from "react"
import { CssContext } from "@/store/context/CssPrefixContext.tsx"
import { userService } from "@/services/userService.ts"

const Home: FC = () => {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls("home-page")

  useEffect(() => {
    userService
      .getUserInfo()
      .then(res => {
        console.log("Success:", res)
      })
      .catch(error => {
        console.log("Error:", error)
      })
  }, [])

  return (
    <div className={`${prefixCls}`}>
      <div>Hello, Eternity Admin!</div>
      <div></div>
    </div>
  )
}

export default Home
