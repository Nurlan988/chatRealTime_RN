import { SET_USER, SET_USER_NULL } from "../constants";

const initialState = {
    user: {},
};

const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_USER_NULL:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export default userAuthReducer;
