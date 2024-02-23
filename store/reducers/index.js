import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import chatReducer from "./chatReducer";

const reducers = combineReducers({
    user: userAuthReducer,
    chats: chatReducer,
});

export default reducers;
