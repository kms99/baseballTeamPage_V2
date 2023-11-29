import dummy from "../../db/data.json";

// action value
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const MODIFY_COMMENT = "MODIFY_COMMENT";
export const SET_CURRENT_COMMENT_DATA = "SET_CURRENT_COMMENT_DATA";

// action
export const addComment = (payload) => {
  // payload => comment object
  return {
    type: ADD_COMMENT,
    payload,
  };
};
export const deleteComment = () => {
  return {
    type: DELETE_COMMENT,
  };
};
export const modifyComment = (payload) => {
  // payload => modifyComment
  return {
    type: MODIFY_COMMENT,
    payload,
  };
};

export const setCurrentCommentData = (payload) => {
  // payload => params.id
  return {
    type: SET_CURRENT_COMMENT_DATA,
    payload,
  };
};

const initialState = {
  comments: JSON.parse(localStorage.getItem("comments")) || dummy,
  findData: {},
};

const comment = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_COMMENT:
      return { ...state, comments: [payload, ...state.comments] };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== state.findData.id
        ),
      };
    case MODIFY_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === state.findData.id) {
            return { ...comment, comment: payload };
          }
          return comment;
        }),
        findData: { ...state.findData, comment: payload },
      };
    case SET_CURRENT_COMMENT_DATA:
      return {
        ...state,
        findData: state.comments.find((comment) => comment.id === payload),
      };
    default:
      return state;
  }
};

export default comment;
