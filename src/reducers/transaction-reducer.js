import { RESET_TRANSACTIONS, ADD_TRANSACTION} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return [{ type: action.transactionType, currency:action.currency, hash: action.payload }, ...state]
        case RESET_TRANSACTIONS:
            return []
        default:
            return state
    }
}