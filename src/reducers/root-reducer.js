import { combineReducers } from 'redux';
import reducer from './reducer';
import balanceReducer from './balance-reducer';
import transactionReducer from "./transaction-reducer";

export default combineReducers({
    reducer,
    balanceReducer,
    transactionReducer
});