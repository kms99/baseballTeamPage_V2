import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  confirmMessage: "",
  visible: false,
  onConfirm: null,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.visible = true;
      state.confirmMessage = action.payload.message;
      state.onConfirm = () => {
        action.payload.onConfirm();
      };
    },
    cancelConfirm: (state) => {
      state.visible = false;
      state.confirmMessage = "";
      state.onConfirm = null;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, cancelConfirm, acceptConfirm } = modalSlice.actions;
