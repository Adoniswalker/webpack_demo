import { combineReducers } from "redux";
import postReducer from "./postReduces";

export default combineReducers({
    posts: postReducer,
    // singlePost: singlePostReducer
});