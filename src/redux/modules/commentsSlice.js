import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  findData: {},
};

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {
    addComment: (state, { payload }) => {
      state.comments.push(payload);
    },
    deleteComment: (state) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== state.findData.id
      );
    },
    editComment: (state, { payload }) => {
      state.comments = state.comments.map((comment) => {
        if (comment.id === state.findData.id) {
          return { ...comment, comment: payload };
        } else {
          return comment;
        }
      });
    },
    setCurrentCommentData: (state, { payload }) => {
      state.findData = state.comments.find((comment) => comment.id === payload);
    },
  },
});

export default commentsSlice.reducer;
export const { addComment, deleteComment, editComment, setCurrentCommentData } =
  commentsSlice.actions;
