import { AUTH } from '../actions/Types';

const stateDefault = {
    userInfo: {}
}
const AuthenticationReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case AUTH:
            return (
                {
                    ...state,
                    userInfo: action.userInfo,
                }
            )

        default:
            return state
    }
}

export default AuthenticationReducer