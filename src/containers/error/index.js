import React from "react";

import "./index.less";
import Header from "@/components/Header";
import ErrorImg from "@/static/images/404.png";

const Error = () => (
  <React.Fragment>
    <Header />
    <div className="error-page">
      <img src={ErrorImg} />
    </div>
  </React.Fragment>
);

export default Error;
