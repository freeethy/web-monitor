/*找回密码*/
import {FINDPWD} from 'Constants/ActionTypes'

const FindPwd = (state = {}, action = {}) => {

  if (state.error) {
    delete state.error;
  }

  switch (action.type) {
    case  `${FINDPWD.GET_VERIFY}`: {
      return {
        ...state,
        Verify: action.Verify
      };
    }
    case `${FINDPWD.GET_EMAIL}`: {
      //所有员工
      return {
        ...state,
        Email: action.Email,
      }
    }
    default:
      return state;
  }
}


export default FindPwd