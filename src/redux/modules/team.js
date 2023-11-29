// action value
export const SET_TEAM = "SET_TEAM";

// action creator
export const setTeam = (payload) => {
  return {
    type: SET_TEAM,
    payload,
  };
};

const initialState = {
  currentTeamIndex: 0,
};

const team = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TEAM:
      return { ...state, currentTeamIndex: payload };
    default:
      return state;
  }
};

export default team;
