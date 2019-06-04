import * as utils from "./utils";
import * as constants from "./constants";

/** globe variable **/
if (!localStorage) {
  window.localStorage = new Object();
}

// 获取当前url
let defaultLocation = window.location.href.split("?")[0].replace("#", "");

export var WEB_MONITOR_ID = "ethy_webmonitor";

// 设备信息
export var DEVICE_INFO = utils.getDevice();
// 获取用户自定义信息
export var USER_INFO = localStorage.wmUserInfo
  ? JSON.parse(localStorage.wmUserInfo)
  : {};

export function MonitorBaseInfo() {
  this.handleLogInfo = function(type, logInfo) {
    var tempString = localStorage[type] || "";
    localStorage[type] = tempString + JSON.stringify(logInfo) + "$$$";
  };
}

// 设置日志对象类的通用属性
export function setCommonProperty() {
  this.happenTime = new Date().getTime(); // 日志发生时间
  this.webMonitorId = WEB_MONITOR_ID || "test"; // 用于区分应用的唯一标识（一个项目对应一个）
  this.simpleUrl = window.location.href.split("?")[0].replace("#", ""); // 页面的url
  this.customerKey = utils.getCustomerKey(); // 用于区分用户，所对应唯一的标识，清理本地数据后失效
  this.pageKey = utils.getPageKey(); // 用于区分页面，所对应唯一的标识，每个新页面对应一个值
  this.deviceName = DEVICE_INFO.deviceName;
  this.os =
    DEVICE_INFO.os + (DEVICE_INFO.osVersion ? " " + DEVICE_INFO.osVersion : "");
  this.browserName = DEVICE_INFO.browserName;
  this.browserVersion = DEVICE_INFO.browserVersion;
  // TODO 位置信息, 待处理
  this.monitorIp = ""; // 用户的IP地址
  this.country = "china"; // 用户所在国家
  this.province = ""; // 用户所在省份
  this.city = ""; // 用户所在城市
  // 用户自定义信息， 由开发者主动传入， 便于对线上进行准确定位
  this.userId = USER_INFO.userId;
  this.firstUserParam = USER_INFO.firstUserParam;
  this.secondUserParam = USER_INFO.secondUserParam;
}

/**
 * 用户访问记录监控
 * @param project 项目详情
//  */
export function checkUrlChange() {
  // 如果是单页应用， 只更改url
  var webLocation = window.location.href.split("?")[0].replace("#", "");
  // 如果url变化了， 就把更新的url记录为 defaultLocation, 重新设置pageKey
  if (defaultLocation != webLocation) {
    // recordPV();
    defaultLocation = webLocation;
  }
}
