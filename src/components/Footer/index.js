import React, { Component } from "react";

import logo from "@/static/images/logo.png";
import "./index.less";

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer>
          <div className="foot">
            Copyright © ICSOC Corporation All Rights
            中通天鸿(北京)通信科技有限公司
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
