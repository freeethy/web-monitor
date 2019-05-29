import { applyMiddleware, createStore, compose } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import axiosMiddlewareConfig from "Utils/axios_middleware_config";
import axiosInstance from "@/utils/ajax";
import thunk from "redux-thunk"; // redux-thunk 支持 dispatch function，并且可以异步调用它

// 创建一个中间件集合
const middleware = [
  axiosMiddleware(axiosInstance, axiosMiddlewareConfig),
  thunk
];

const finalCreateStore = compose(applyMiddleware(...middleware))(createStore);

export default finalCreateStore;
