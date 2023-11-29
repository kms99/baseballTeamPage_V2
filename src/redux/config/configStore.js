import { configureStore } from "@reduxjs/toolkit";
import teamSlice from "../modules/teamSlice";
import commentsSlice from "../modules/commentsSlice";
import authSlice from "../modules/authSlice";

const store = configureStore({
  reducer: { teamSlice, commentsSlice, authSlice },
});

export default store;
