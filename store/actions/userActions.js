import { SET_IS_LOADING, SET_USER, SET_USER_NULL } from "../constants";

export const setUser = (payload) => ({
    type: SET_USER,
    payload,
});

export const setUserNull = () => ({
    type: SET_USER_NULL,
});

export const setIsLoading = () => ({
    type: SET_IS_LOADING,
});
