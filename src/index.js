import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Router, match, browserHistory } from "react-router";
import { routerReducer, syncHistoryWithStore } from "react-router-redux";

import reducers from "./reducers/reducer";
import configureStore from "./store";
import routes from "./routes";

import moment from "moment"

moment().format();

//传入reducer获取store
const store = configureStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

//这里使用了html5的browserHistory， 而不是hash路由
//同步history路由到redux的store中
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
