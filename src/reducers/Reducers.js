import { combineReducers } from 'redux';
import ShiftStartReducer from './ShiftStartReducer';
import AuthenticationReducer from './AuthenticationReducer';
import TripsReducer from './TripsReducer';
import ManageCustomerReducer from './ManageCustomerReducer';
import { LOGOUT } from '../actions/Types';

const RootReducers = combineReducers({
    ShiftStartReducer,
    AuthenticationReducer,
    TripsReducer,
    ManageCustomerReducer,
})

const appReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined
    }

    return RootReducers(state, action)
}

export default appReducer