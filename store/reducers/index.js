import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";

const reducers = combineReducers({
    user: userAuthReducer,
});

export default reducers;
