import * as types from './Types';

export const Authentication = (userInfo) => ({
    type: types.AUTH,
    userInfo: userInfo
})

export const InputShiftStart = text => ({
    type: types.SHIFTSTARTKM,
    text
})