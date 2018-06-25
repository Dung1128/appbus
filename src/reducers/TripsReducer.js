import { LISTROUTE } from '../actions/Types';

const stateDefault = {
    route: {},
}
const TripsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LISTROUTE:
            return (
                {
                    ...state,
                    route: action.route,
                }
            )

        default:
            return state
    }
}

export default TripsReducer