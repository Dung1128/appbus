import { combineReducers } from 'redux';
import ShiftStartReducer from './ShiftStartReducer';
import AuthenticationReducer from './AuthenticationReducer';

const RootReducers = combineReducers({
    ShiftStartReducer,
    AuthenticationReducer,
})

export default RootReducers