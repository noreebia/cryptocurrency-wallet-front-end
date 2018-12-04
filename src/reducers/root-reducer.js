import { combineReducers } from 'redux';
import reducer from './reducer';
import balanceReducer from './balance-reducer';

export default combineReducers({
    reducer,
    balanceReducer
});