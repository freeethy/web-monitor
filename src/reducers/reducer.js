import { combineReducers } from "redux";

//引入各个reducer
import ResetPwd from "./resetPwd";
const reducers = {
  ResetPwd
};

//合并普通reducer和route的reducer
const finalCombineReducers = routerReducer => {
  return combineReducers({
    ...reducers,
    routing: routerReducer
  });
};

export default finalCombineReducers;
