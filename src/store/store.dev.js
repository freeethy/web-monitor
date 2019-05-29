import { applyMiddleware, createStore, compose } from "redux";
import axiosMiddleware from "redux-axios-middleware";

import axiosMiddlewareConfig from "@/utils/axios_middleware_config";

import axiosInstance from "@/utils/ajax";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import DevTools from "@/containers/DevTools";

// 创建日志中间件
const loggerMiddleware = createLogger();

// 创建一个中间件集合
const middleware = [
  axiosMiddleware(axiosInstance, axiosMiddlewareConfig),
  thunk
];

let finalCreateStore;
// 利用compose增强store，这个 store 与 applyMiddleware 和 redux-devtools 一起使用
if (
  !(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)
) {
  finalCreateStore = compose(applyMiddleware(...middleware))(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore);
}

export default finalCreateStore;
