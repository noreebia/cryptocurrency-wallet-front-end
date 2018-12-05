import { SET_BALANCES, REFRESH_BALANCE } from "../actions/types";

const initialState = [{
    "currencyName": "ethereum",
    "currencySymbol": "eth",
    "balance": 0
},
{
    "currencyName": "konkukcoin",
    "currencySymbol": "kkc",
    "balance": 0
}];

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_BALANCES:
            return [...action.payload]
        case REFRESH_BALANCE:
            return initialState
        default:
            return state
    }
}