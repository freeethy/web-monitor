import React, { Component } from "react";

import "./index.less";

const MainContent = ({ children, header, footer, className }) => {
  let resetClass = className?className:'';
  return (
    <div className={`main-content ${resetClass}`}>
      <div className="header">
        <span className="header-icon" />
        <div className="header-content">{header}</div>
      </div>
      <div className="content">{children}</div>
      <div className="footer">
        <div className="footer-content">{footer}</div>
      </div>
    </div>
  );
};

export default MainContent;
