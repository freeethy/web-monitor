import { COMMON } from 'Constants/ActionTypes' // 引入action类型常量名


const { GET_USER_INFO,TOGGLE_SIDER } = COMMON
// 初始化state数据
const initialState = {
    collapsed:true
}

// 通过dispatch action进入
// 根据不同的action type进行state的更新
export default function common(state = initialState, action) {
    switch (action.type) {

        case `${TOGGLE_SIDER}`:
            return {
                ...state,
                collapsed: action.data,
            }
        default:
            return state
    }
}