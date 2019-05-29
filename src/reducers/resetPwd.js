import { RESET_PASSWORD_LEVEL, RESET_PASSWORD_SET } from "@/constants/resetPwd";

const resetPwd = (state, action) => {
  switch (action.type) {
    case `${RESET_PASSWORD_LEVEL}_SUCCESS`:
      return { pwdLevel: action.payload.data };
    // case `${RESET_PASSWORD_SET}_SUCCESS`:
    //   return { pwdSet: action.payload.data };
    default:
      return state;
  }
};
export default resetPwd;
