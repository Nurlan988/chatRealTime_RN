import { SET_IS_LOADING, SET_USER, SET_USER_NULL } from "../constants";

const initialState = {
    user: {},
    isLoading: false,
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
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        default:
            return state;
    }
};

export default userAuthReducer;
