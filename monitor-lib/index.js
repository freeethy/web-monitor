import * as utils from "./resource/utils";
import * as constants from "./resource/constants";
import * as common from "./resource/common";

import { recordBehavior } from "./resource/behavior";

/**
 * 监控初始化配置, 以及启动的方法
 */
function init() {
  try {
    // 启动监控
    //   recordResourceError();
    //   recordPV();
    //   recordLoadPage();
    recordBehavior({ record: 1 });
    //   recordJavaScriptError();
    //   recordHttpLog();

    /**
     * 添加一个定时器，进行数据的上传
     * 2秒钟进行一次URL是否变化的检测
     * 10秒钟进行一次数据的检查并上传
     */
    var timeCount = 0;
    setInterval(function() {
      common.checkUrlChange();
      // 循环5后次进行一次上传
      if (timeCount >= 25) {
        // 如果是本地的localhost, 就忽略，不进行上传

        //   var logInfo =
        //     (localStorage[ELE_BEHAVIOR] || "") +
        //     (localStorage[JS_ERROR] || "") +
        //     (localStorage[HTTP_LOG] || "") +
        //     (localStorage[SCREEN_SHOT] || "") +
        //     (localStorage[CUSTOMER_PV] || "") +
        //     (localStorage[LOAD_PAGE] || "") +
        //     (localStorage[RESOURCE_LOAD] || "") +
        //     (localStorage[CUSTOMIZE_BEHAVIOR] || "");
        var logInfo = localStorage[constants.ELE_BEHAVIOR];

        if (logInfo) {
          localStorage[constants.ELE_BEHAVIOR] = "";
          // localStorage[JS_ERROR] = "";
          // localStorage[HTTP_LOG] = "";
          // localStorage[SCREEN_SHOT] = "";
          // localStorage[CUSTOMER_PV] = "";
          // localStorage[LOAD_PAGE] = "";
          // localStorage[RESOURCE_LOAD] = "";
          // localStorage[CUSTOMIZE_BEHAVIOR] = "";
          utils.ajax(
            "POST",
            constants.HTTP_UPLOAD_LOG_INFO,
            { logInfo: logInfo },
            function(res) {},
            function() {}
          );
        }
        timeCount = 0;
      }
      timeCount++;
    }, 200);
  } catch (e) {
    console.error("监控代码异常，捕获", e);
  }
}
window.onload = function() {
  init();
};
