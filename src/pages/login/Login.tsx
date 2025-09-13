import {useContext} from "react";
import {CssContext} from "../../config/context.tsx";

function Login() {
  const { getPrefixCls } = useContext(CssContext)
  const prefixCls = getPrefixCls('home-page');
  return (
      <div className={`${prefixCls}`}>
        <h1>Login</h1>
      </div>
  )
}

export default Login
