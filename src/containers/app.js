import React, { Component } from "react";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
// import flexible from "@/static/js/flexible/flexible";

require("./app.less");

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children } = this.props;

    return <LocaleProvider locale={zh_CN}>{children}</LocaleProvider>;
  }
}
