import * as types from './Types';

export const Authentication = (userInfo) => ({
    type: types.AUTH,
    userInfo: userInfo
})

export const InputShiftStart = text => ({
    type: types.SHIFTSTARTKM,
    text,
})

export const GetInfoRoute = route => ({
    type: types.LISTROUTE,
    route,
})

export const InputSerialTicket = serial => ({
    type: types.SERIALTICKET,
    serial,
})

export const InputBusStop = busStop => ({
    type: types.BUSSTOP,
    busStop,
})

export const InputDriverName = driver => ({
    type: types.DRIVERNAME,
    driver,
})

export const InputVehicle = vehicle => ({
    type: types.VEHICLE,
    vehicle,
})

export const ClearCache = () => ({
    type: types.CLEARCACHE,
    data: '',
})

export const Logout = () => ({
    type: types.LOGOUT,
})

export const GetMenu = menu => ({
    type: types.MENU,
    menu,
})