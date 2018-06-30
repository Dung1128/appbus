import { AUTH, MENU } from '../actions/Types';

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

        case MENU:
            return (
                {
                    ...state,
                    menu: action.menu,
                }
            )

        default:
            return state
    }
}

export default AuthenticationReducer