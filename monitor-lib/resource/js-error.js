import * as common from "./common";
import * as constants from "./constants";

// JS错误日志，继承于日志基类MonitorBaseInfo
function JavaScriptErrorInfo(uploadType, infoType, errorMsg, errorStack) {
  common.setCommonProperty.apply(this);
  this.uploadType = uploadType;
  this.infoType = infoType;
  this.pageKey = utils.getPageKey(); // 用于区分页面，所对应唯一的标识，每个新页面对应一个值
  this.deviceName = common.DEVICE_INFO.deviceName;
  this.os =
    common.DEVICE_INFO.os +
    (common.DEVICE_INFO.osVersion ? " " + common.DEVICE_INFO.osVersion : "");
  this.browserName = common.DEVICE_INFO.browserName;
  this.browserVersion = common.DEVICE_INFO.browserVersion;
  // TODO 位置信息, 待处理
  this.monitorIp = ""; // 用户的IP地址
  this.country = "china"; // 用户所在国家
  this.province = ""; // 用户所在省份
  this.city = ""; // 用户所在城市
  this.errorMessage = utils.b64EncodeUnicode(errorMsg);
  this.errorStack = utils.b64EncodeUnicode(errorStack);
  this.browserInfo = "";
}
JavaScriptErrorInfo.prototype = new MonitorBaseInfo();

function siftAndMakeUpMessage(
  infoType,
  origin_errorMsg,
  origin_url,
  origin_lineNumber,
  origin_columnNumber,
  origin_errorObj
) {
  // 记录js错误前，检查一下url记录是否变化
  common.checkUrlChange();
  var errorMsg = origin_errorMsg ? origin_errorMsg : "";
  var errorObj = origin_errorObj ? origin_errorObj : "";
  var errorType = "";
  if (errorMsg) {
    if (typeof errorObj === "string") {
      errorType = errorObj.split(": ")[0].replace('"', "");
    } else {
      var errorStackStr = JSON.stringify(errorObj);
      errorType = errorStackStr.split(": ")[0].replace('"', "");
    }
  }
  var javaScriptErrorInfo = new JavaScriptErrorInfo(
    constants.JS_ERROR,
    infoType,
    errorType + ": " + errorMsg,
    errorObj
  );
  javaScriptErrorInfo.handleLogInfo(constants.JS_ERROR, javaScriptErrorInfo);
}

// 重写 onerror 进行jsError的监听
window.onerror = function(errorMsg, url, lineNumber, columnNumber, errorObj) {
  //   jsMonitorStarted = true;
  var errorStack = errorObj ? errorObj.stack : null;
  siftAndMakeUpMessage(errorMsg, url, lineNumber, columnNumber, errorStack);
};

var oldError = console.error;
console.error = function(errorMsg) {
  siftAndMakeUpMessage(errorMsg, WEB_LOCATION, 0, 0, {
    CustomizeError: "CustomizeError: No error stack"
  });
  return oldError.apply(console, arguments);
};

window.onunhandledrejection = function(e) {
  var errorMsg = "";
  if (typeof e.reason === "object") {
    errorMsg = JSON.stringify(e.reason);
  } else {
    errorMsg = e.reason;
  }
  siftAndMakeUpMessage(errorMsg, WEB_LOCATION, 0, 0, {
    CustomizeError: "CustomizeError: No error stack"
  });
};
