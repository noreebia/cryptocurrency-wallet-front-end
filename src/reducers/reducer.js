import { CHANGE_LOGIN_STATUS, SET_USERNAME, SET_PASSWORD, SET_ETHEREUM_ADDRESS } from "../actions/types";

const initialState = {
    isLoggedIn: false,
    username: "",
    password: "",
    ethAddressOfUser: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LOGIN_STATUS:
            if (!action.payload.isLoggedIn) {
                return Object.assign({}, initialState)
            } else {
                const {payload} = action;
                return Object.assign({}, state, payload)
            }
        case SET_USERNAME:
            return Object.assign({}, state, { username: action.payload })
        case SET_PASSWORD:
            return Object.assign({}, state, { password: action.payload })
        case SET_ETHEREUM_ADDRESS:
            return Object.assign({}, state, { ethAddressOfUser: action.payload })
        default:
            return state
    }
}