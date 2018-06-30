import { SERIALTICKET, BUSSTOP, CLEARCACHE, DRIVERNAME, VEHICLE } from '../actions/Types';

const stateDefault = {
    categoryTicket: '',
    busStop: '',
    driver: '',
    vehicle: '',
}

const ManageCustomerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SERIALTICKET:
            return (
                {
                    ...state,
                    categoryTicket: action.serial,
                }
            )

        case BUSSTOP:
            return (
                {
                    ...state,
                    busStop: action.busStop,
                }
            )

        case DRIVERNAME:
            return (
                {
                    ...state,
                    driver: action.driver,
                }
            )

        case VEHICLE:
            return (
                {
                    ...state,
                    vehicle: action.vehicle,
                }
            )

        case CLEARCACHE:
            return ({
                ...state,
                ...stateDefault,
            });

        default:
            return state
    }
}

export default ManageCustomerReducer