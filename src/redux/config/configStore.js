import { configureStore } from "@reduxjs/toolkit";
import team from "../modules/team";
import comment from "../modules/comment";

const store = configureStore({ reducer: { team, comment } });

export default store;
