import { RESET_BALANCES, UPDATE_BALANCES} from "../actions/types";

const initialState = [{
    "currencyName": "ethereum",
    "currencySymbol": "eth",
    "balance": 0
},
{
    "currencyName": "konkukcoin",
    "currencySymbol": "kuc",
    "balance": 0
}];

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BALANCES:
            return [...action.payload]
        case RESET_BALANCES:
            return initialState
        default:
            return state
    }
}