import React from "react";

const Item = ({ flag, text = "" }) => {
  return (
    <p className="reset-pwd-tip">
      {flag === undefined ? <i className="reset-pwd-tip-init" /> : null}
      {flag === true ? (
        <i className="iconfont iconcheck-fill" style={{ color: "#34CB82" }} />
      ) : null}
      {flag === false ? (
        <i className="iconfont iconclose-fill" style={{ color: "#F63C3C" }} />
      ) : null}

      <span>{text}</span>
    </p>
  );
};

const PwdTip = ({ checkLength = undefined, checkType = undefined }) => {
  return (
    <React.Fragment>
      <Item flag={checkLength} text="密码长度为6-32个字符" />
      <Item flag={checkType} text="同时包含字母和数字" />
    </React.Fragment>
  );
};
export default PwdTip;
