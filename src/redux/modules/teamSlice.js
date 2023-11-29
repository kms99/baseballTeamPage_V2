import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTeamIndex: 0,
};

const teamSlice = createSlice({
  name: "teamSlice",
  initialState,
  reducers: {
    setTeam: (state, { payload }) => {
      state.currentTeamIndex = payload;
    },
  },
});

export default teamSlice.reducer;
export const { setTeam } = teamSlice.actions;
