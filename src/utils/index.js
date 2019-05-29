/* global window */

//获取指定hash值
export function getHashParameter(key) {
  const arr = (location.hash || "").replace(/^\#/, "").split("&");
  const params = {};
  for (let i = 0; i < arr.length; i++) {
    let data = arr[i].split("=");
    if (data.length == 2) {
      params[data[0]] = data[1];
    }
  }
  return params[key];
}

//获取cookie
export function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    let value = arr[2];
    // 如果取水印的cookie，需要decodeURI
    if (name === "watermark") {
      value = decodeURIComponent(value);
    }
    return unescape(value);
  } else {
    return null;
  }
}
