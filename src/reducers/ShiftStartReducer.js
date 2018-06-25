import { SHIFTSTARTKM } from '../actions/Types';

const stateDefault = {
    text: '',
}
const ShiftStartReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SHIFTSTARTKM:
            return (
                {
                    ...state,
                    text: action.text,
                }
            )

        default:
            return state
    }
}

export default ShiftStartReducer