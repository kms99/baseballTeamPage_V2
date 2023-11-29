import { configureStore } from "@reduxjs/toolkit";
import teamSlice from "../modules/teamSlice";
import commentsSlice from "../modules/commentsSlice";

const store = configureStore({ reducer: { teamSlice, commentsSlice } });

export default store;
