export function getUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getCustomerKey() {
  var customerKey = this.getUuid();
  if (!localStorage.monitorCustomerKey)
    localStorage.monitorCustomerKey = customerKey;
  return localStorage.monitorCustomerKey;
}

/**
 * 获取页面的唯一标识
 */
export function getPageKey() {
  var pageKey = this.getUuid();
  if (!localStorage.monitorPageKey) localStorage.monitorPageKey = pageKey;
  return localStorage.monitorPageKey;
}

export function getDevice() {
  var device = {};
  var ua = navigator.userAgent;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  var mobileInfo = ua.match(/Android\s[\S\s]+Build\//);
  device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
  device.isWeixin = /MicroMessenger/i.test(ua);
  device.os = "web";
  device.deviceName = "PC";
  // Android
  if (android) {
    device.os = "android";
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf("chrome") >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, ".");
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, ".");
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, ".") : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf("Version/") >= 0) {
    if (device.osVersion.split(".")[0] === "10") {
      device.osVersion = ua
        .toLowerCase()
        .split("version/")[1]
        .split(" ")[0];
    }
  }

  // 如果是ios, deviceName 就设置为iphone，根据分辨率区别型号
  if (device.iphone) {
    device.deviceName = "iphone";
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    if (screenWidth === 320 && screenHeight === 480) {
      device.deviceName = "iphone 4";
    } else if (screenWidth === 320 && screenHeight === 568) {
      device.deviceName = "iphone 5/SE";
    } else if (screenWidth === 375 && screenHeight === 667) {
      device.deviceName = "iphone 6/7/8";
    } else if (screenWidth === 414 && screenHeight === 736) {
      device.deviceName = "iphone 6/7/8 Plus";
    } else if (screenWidth === 375 && screenHeight === 812) {
      device.deviceName = "iphone X/S/Max";
    }
  } else if (device.ipad) {
    device.deviceName = "ipad";
  } else if (mobileInfo) {
    var info = mobileInfo[0];
    var deviceName = info.split(";")[1].replace(/Build\//g, "");
    device.deviceName = deviceName.replace(/(^\s*)|(\s*$)/g, "");
  }
  // 浏览器模式, 获取浏览器信息
  // TODO 需要补充更多的浏览器类型进来
  if (ua.indexOf("Mobile") == -1) {
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi;
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;

    device.browserName = "未知";
    //IE
    if (agent.indexOf("msie") > 0) {
      var browserInfo = agent.match(regStr_ie)[0];
      device.browserName = browserInfo.split("/")[0];
      device.browserVersion = browserInfo.split("/")[1];
    }
    //firefox
    if (agent.indexOf("firefox") > 0) {
      var browserInfo = agent.match(regStr_ff)[0];
      device.browserName = browserInfo.split("/")[0];
      device.browserVersion = browserInfo.split("/")[1];
    }
    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
      var browserInfo = agent.match(regStr_saf)[0];
      device.browserName = browserInfo.split("/")[0];
      device.browserVersion = browserInfo.split("/")[1];
    }
    //Chrome
    if (agent.indexOf("chrome") > 0) {
      var browserInfo = agent.match(regStr_chrome)[0];
      device.browserName = browserInfo.split("/")[0];
      device.browserVersion = browserInfo.split("/")[1];
    }
  }
  // Webview
  device.webView =
    (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Export object
  return device;
}

export function b64EncodeUnicode(str) {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode("0x" + p1);
      })
    );
  } catch (e) {
    return str;
  }
}

/**
 * 封装简易的ajax请求
 * @param method  请求类型(大写)  GET/POST
 * @param url     请求URL
 * @param param   请求参数
 * @param successCallback  成功回调方法
 * @param failCallback   失败回调方法
 */
export const ajax = function(
  method,
  url,
  param,
  successCallback,
  failCallback
) {
  fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(param)
  })
    .then(res => {
      console.log(res);
    })
    .then(function(res) {
      console.log(res);
    });

  //   var xmlHttp = window.XMLHttpRequest
  //     ? new XMLHttpRequest()
  //     : new ActiveXObject("Microsoft.XMLHTTP");
  //   xmlHttp.open(method, url, true);
  //   xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  //   xmlHttp.onreadystatechange = function() {
  //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
  //       var res = JSON.parse(xmlHttp.responseText);
  //       typeof successCallback == "function" && successCallback(res);
  //     } else {
  //       typeof failCallback == "function" && failCallback();
  //     }
  //   };
  //   xmlHttp.send("data=" + JSON.stringify(param));
};
