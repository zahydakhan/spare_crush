import * as types from '../constants';

export function setUser(value) {
    return {
        type: types.SET_USERS,
        payload: value
    }
}
export function setUserInfo(value) {
    return {
        type: types.SET_USERINFO,
        payload: value
    }
}