import React from "react";
import { Icon } from "antd";

const LinkInvalid = () => {
  return (
    <div className="reset-link-error">
      <Icon
        type="exclamation-circle"
        style={{ color: "#ccc" }}
        theme="filled"
      />
      <p>该链接已失效！</p>
    </div>
  );
};

export default LinkInvalid;
