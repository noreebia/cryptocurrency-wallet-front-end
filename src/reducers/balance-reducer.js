import { ADD_BALANCE, REFRESH_BALANCE, EMPTY_BALANCE } from "../actions/types";

const initialState = {
    balances: [{
        "currencyName": "ethereum",
        "currencySymbol": "eth",
        "balance": 0
    },
    {
        "currencyName": "konkukcoin",
        "currencySymbol": "kkc",
        "balance": 0
    }]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_BALANCE:
            return Object.assign({}, state, { balances: state.balances.concat(action.payload) })
        case REFRESH_BALANCE:
            return initialState;
        case EMPTY_BALANCE:
            return { balances: [] }
        default:
            return state
    }
}