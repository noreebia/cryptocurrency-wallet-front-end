import { CHANGE_LOGIN_STATUS, SET_USERNAME, SET_PASSWORD, SET_ETHEREUM_ADDRESS, UPDATE_BALANCE } from "./types";

export const setLoginStatus = status => ({
    type: CHANGE_LOGIN_STATUS,
    payload: status
})

export const setUsername = username => ({
    type: SET_USERNAME,
    payload: username
})

export const setPassword = password => ({
    type: SET_PASSWORD,
    payload: password
})

export const setEthAddressOfUser = address => ({
    type: SET_ETHEREUM_ADDRESS,
    payload: address
})

export const updateBalance = balance => ({
    type: UPDATE_BALANCE,
    payload: balance
})
