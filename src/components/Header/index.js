import React, { Component } from "react";

import logo from "@/static/images/logo.png";
import "./index.less";

export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <div className="head">
            <div className="head-left">
              <img src={logo} />
            </div>
            <div className="head-right">
              <span>
                <i className="iconfont icontel" />
                <span>客服热线：</span>
                <b>400-616-5600</b>
              </span>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}
