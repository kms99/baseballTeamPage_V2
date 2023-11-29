import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import comment from "../../axios/comments";

export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    try {
      const response = await comment.get("/letters");
      console.log(response.data[0]);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __postComments = createAsyncThunk(
  "postComments",
  async (payload, thunkAPI) => {
    try {
      const response = await comment.post("/letters", payload);
      toast.success(`성공적으로 게시물이 업로드 되었습니다.`);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __updateComments = createAsyncThunk(
  "updateComments",
  async (payload, thunkAPI) => {
    try {
      const response = await comment.patch("/letters", payload);
      toast.success(`성공적으로 게시물이 수정 되었습니다.`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteComments = createAsyncThunk(
  "deleteComments",
  async (payload, thunkAPI) => {
    try {
      const response = await comment.delete("/letters", payload);
      toast.success(`성공적으로 게시물이 삭제 되었습니다.`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  comments: [],
  findData: {},
  isLoading: false,
  isError: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  extraReducers: {
    [__getComments.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    [__postComments]: (state, action) => {
      state.comments.push(action.payload);
    },
    [__updateComments]: (state, action) => {
      state.comments = state.comments.map((comment) => {
        {
          if (comment.id === action.payload.id)
            return { ...comment, content: action.payload.context };
          else return comment;
        }
      });
    },
    [__deleteComments]: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export default commentsSlice.reducer;
export const { addComment, deleteComment, editComment, setCurrentCommentData } =
  commentsSlice.actions;
