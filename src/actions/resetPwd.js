import axios from "axios";
import {
  RESET_PASSWORD_LEVEL,
  RESET_PASSWORD_SET,
  RESET_PASSWORD_CHECK_TOKEN,
  RESET_PASSWORD_SET_LOGIN
} from "@/constants/resetPwd";

export function getPwdLevel(data) {
  return {
    type: RESET_PASSWORD_LEVEL,
    payload: {
      request: {
        method: "post",
        url: `${
          process.env.REACT_APP_API_DOMAIN
        }/api/v1/account/password_check`,
        data
      }
    }
  };
}
export function setPwd(data) {
  return {
    type: RESET_PASSWORD_SET,
    payload: {
      request: {
        method: "post",
        url: `${
          process.env.REACT_APP_API_DOMAIN
        }/api/v1/account/users/forget_password`,
        data
      }
    }
  };
}
export function setLoginPwd(data, config) {
  return {
    type: RESET_PASSWORD_SET_LOGIN,
    payload: {
      request: {
        method: "post",
        url: `${
          process.env.REACT_APP_API_DOMAIN
        }/api/v1/account/users/password_reset`,
        data,
        ...config
      }
    }
  };
}

export function checkToken(data) {
  return {
    type: RESET_PASSWORD_CHECK_TOKEN,
    payload: {
      request: {
        method: "post",
        url: `${
          process.env.REACT_APP_API_DOMAIN
        }/api/v1/account/users/forget_password/check_token`,
        data
      }
    }
  };
}
