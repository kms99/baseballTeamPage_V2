import { combineReducers, createStore } from "redux";
import team from "../modules/team";
import comment from "../modules/comment";

const rootReducer = combineReducers({ team, comment });
const store = createStore(rootReducer);

export default store;
