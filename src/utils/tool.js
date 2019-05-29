import { browserHistory } from "react-router";

export function fillZero(num) {
  return num > 9 ? String(num) : "0" + String(num);
}

export function getTime(date, type) {
  if (!date || date == 0) return "";

  let time;
  let now = new Date(date),
    year = now.getFullYear(),
    month = now.getMonth() + 1,
    day = now.getDate(),
    hour = now.getHours(),
    min = now.getMinutes(),
    second = now.getSeconds();

  time =
    type == "YYYY-MM-DD"
      ? year + "-" + fillZero(month) + "-" + fillZero(day)
      : year +
        "-" +
        fillZero(month) +
        "-" +
        fillZero(day) +
        " " +
        fillZero(hour) +
        ":" +
        fillZero(min) +
        ":00";
  return time;
}

//修改微信标题
export function updateTitle(name) {
  if (typeof document !== "undefined") {
    document.title = name;
    const iframe = document.createElement("iframe");
    iframe.src = "/favicon.ico";
    iframe.style.display = "none";
    iframe.addEventListener("load", func);
    document.body.appendChild(iframe);

    const func = function() {
      setTimeout(function() {
        iframe.removeEventListener("load", func);
        // document.body.removeChild(iframe);
        iframe.remove();
      }, 0);
    };
  }
}

//添加记录
function pushHistory(title) {
  var state = {
    title: title,
    url: location.pathname
  };
  window.history.pushState(state, state.title, state.url);
}

//退后键指向制定页面
export function toTheUrl(url, title, bc) {
  if (typeof document === "undefined") {
    return;
  }

  //如果已由监听则先删除监听
  if (window.toTheUrlFunc) {
    window.removeEventListener("popstate", window.toTheUrlFunc);
  }

  window.toTheUrlFunc = function() {
    browserHistory.push(url);
    if (typeof bc === "function") {
      bc();
    }
    //utils.pushHistory(title);
  };
  pushHistory(title);
  //设置新的监听
  window.addEventListener("popstate", toTheUrlFunc, false);
}

//退后键指向关闭页面（微信）
export function toClosePage(title) {
  if (typeof document === "undefined") {
    return;
  }

  //如果已由监听则先删除监听
  if (window.toTheUrlFunc) {
    window.removeEventListener("popstate", window.toTheUrlFunc);
  }

  window.toTheUrlFunc = function() {
    if (typeof WeixinJSBridge !== "undefined") {
      WeixinJSBridge.call("closeWindow");
    }
  };
  pushHistory(title);
  //设置新的监听
  window.addEventListener("popstate", toTheUrlFunc, false);
}
