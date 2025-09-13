import './Home.less'
import {useContext} from "react";
import {CssContext} from "../../config/context.tsx";


function Home() {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls('home-page');
  return (
    <div className={`${prefixCls}`}>
        Hello, Eternity Admin!
    </div>
  )
}

export default Home
