import React from "react"; // 引入react
import { Route, IndexRoute, browserHistory } from "react-router"; // 引入react路由

import app from "@/containers/app";
import error from "@/containers/error";
// 重置密码
import ResetPwd from "@/containers/ResetPwd";
// import LoginReset from "@/containers/ResetPwd/loginReset";

const requireAuth = (nextState, replace) => {};

const validErrorRoute = (nextState, replace) => {
  replace("/");
};

export default (
  <Route path="/">
    <Route component={app} onEnter={requireAuth}>
      <Route path="/resetPwd" component={ResetPwd} />
      {/* <Route path="/loginReset" component={LoginReset} /> */}
      <Route path="*" component={error} />
    </Route>
  </Route>
);
