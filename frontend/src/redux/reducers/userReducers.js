import * as types from "../constants";

export default function reducer(state = { currentUser: "" }, actions) {
    switch (actions.type) {
        case types.SET_USERS:
            return {
                ...state,
                currentUser: actions.payload,
            };

        default:
            return state;
    }
}