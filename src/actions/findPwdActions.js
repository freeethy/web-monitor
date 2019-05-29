/*在线客服报表接口请求：员工，渠道，员工组，平台*/
import axios from "axios";
import {FINDPWD,ERROR} from 'Constants/ActionTypes'



// 接口地址
// let userCenterDomain = 'https://account.icsoc.net';  // 生产环境
let userCenterDomain = 'https://account-test.icsoc.net';  // test 环境

let
  // 获取验证码
  getVerify_url = `${userCenterDomain}/api/v1/account/get_verify`,
  // 找回密码检查 - 获取 email 信息
  getEmail_url = `${userCenterDomain}/api/v1/account/users/forget_password/get_email`,
  // 发送邮件
  sendEmail_url = `${userCenterDomain}/api/v1/account/users/forget_password/email`;

//获取cookie
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}


// 获取验证码
export const getVerify= (params, cb) => {
  return dispatch => {
    axios
      .get(getVerify_url, {
        params,
      })
      .then(response => {
        if(response.data && response.data.code == 0){
          const Verify = response.data;
          const GetVerify = {
            type: FINDPWD.GET_VERIFY,
            Verify
          };
          dispatch(GetVerify);
          cb && cb(Verify);
        }
      })
      .catch(err => {
        dispatch(TickelistError(err));
      });
  };
};

// 找回密码检查 - 获取 email 信息
export const getEmail= (params, cb) => {
  return dispatch => {
    axios
      .get(getEmail_url, {
        params,
      })
      .then(response => {
        if(response.data){
          const Email = response.data;
          const GetEmail = {
            type: FINDPWD.GET_EMAIL,
            Email
          };
          dispatch(GetEmail);
          cb && cb(Email);
        }
      })
      .catch(err => {
        dispatch(TickelistError(err));
      });
  };
};



//报错-
export const TickelistError = err => {
  return {
    type: ERROR.DYNAMICFIELD_ERR,
    err
  };
};