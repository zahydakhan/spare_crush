import * as types from "../constants";

export default function reducer(state = { user_name: '' }, actions) {
    switch (actions.type) {

        case types.SET_USERINFO:
            return {
                user_name: actions.payload
            };

        default:
            return state;
    }
}