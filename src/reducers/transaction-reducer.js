import { RESET_TRANSACTIONS, ADD_TRANSACTION} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            return [...state, { type: action.transactionType, hash: action.payload }]
        case RESET_TRANSACTIONS:
            return []
        default:
            return state
    }
}