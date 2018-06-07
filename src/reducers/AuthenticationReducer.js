import { AUTH } from '../actions/Types';

const stateDefault = {
    userInfo: {}
}
const AuthenticationReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action);
            return (
                {
                    ...state,
                    userInfo: {}
                }
            )

        default:
            return state
    }
}

export default AuthenticationReducer