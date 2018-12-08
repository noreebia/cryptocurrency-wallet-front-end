import { CHANGE_LOGIN_STATUS, SET_USERNAME, SET_PASSWORD, SET_ETHEREUM_ADDRESS, UPDATE_BALANCES, RESET_BALANCES, ADD_TRANSACTION, RESET_TRANSACTIONS, SET_PEERS, RESET_PEERS} from "./types";

export const setLoginStatus = (details) => ({
    type: CHANGE_LOGIN_STATUS,
    payload: details
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

export const updateBalances = balances => ({
    type: UPDATE_BALANCES,
    payload: balances
})

export const resetBalances = () => ({
    type: RESET_BALANCES,
})

export const addTransaction = (transactionType, transaction) => ({
    type: ADD_TRANSACTION,
    transactionType: transactionType,
    payload: transaction,
})

export const resetTransactions = () => ({
    type: RESET_TRANSACTIONS,
})
