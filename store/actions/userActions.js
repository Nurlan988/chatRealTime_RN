import { SET_USER, SET_USER_NULL } from "../constants";

export const setUser = (payload) => ({
    type: SET_USER,
    payload,
});

export const setUserNull = () => ({
    type: SET_USER_NULL,
});
