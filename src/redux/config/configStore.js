import { configureStore } from "@reduxjs/toolkit";
import teamSlice from "../modules/teamSlice";
import commentsSlice from "../modules/commentsSlice";
import authSlice from "../modules/authSlice";
import modalSlice from "../modules/modalSlice";

const store = configureStore({
  reducer: { teamSlice, commentsSlice, authSlice, modalSlice },
});

export default store;
