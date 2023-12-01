import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import comment from "../../axios/comments";

// 게시물 전체 가져오기
export const __getComments = createAsyncThunk(
  "getComments",
  async (payload, thunkAPI) => {
    //payload를 사용하지 않는데 꼭 써야하는 이유??, payload를 사용하지 않으면 오류발생
    try {
      const response = await comment.get(
        "/letters?_sort=createdAt,views&_order=desc"
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

// 단일 게시물 가져오기 (detail)
export const __getDetailComments = createAsyncThunk(
  "getDetailComments",
  async (payload, thunkAPI) => {
    try {
      const response = await comment.get(`/letters/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

// 게시물 등록하기
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
      return thunkAPI.rejectWithValue();
    }
  }
);

// 게시물 업데이트하기
export const __updateComments = createAsyncThunk(
  "updateComments",
  async (payload, thunkAPI) => {
    try {
      const response = await comment.patch(
        `/letters/${payload.updateTargetId}`,
        payload.updateData
      );
      toast.success(`성공적으로 게시물이 수정 되었습니다.`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

// 게시물 삭제하기
export const __deleteComments = createAsyncThunk(
  "deleteComments",
  async (payload, thunkAPI) => {
    try {
      await comment.delete(`/letters/${payload}`);
      const response = await comment.get(
        "/letters?_sort=createdAt,views&_order=desc"
      );

      toast.success(`성공적으로 게시물이 삭제 되었습니다.`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  comments: [],
  findData: {},
  isLoading: false,
};

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  extraReducers: {
    [__getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    [__getComments.rejected]: (state) => {
      state.isLoading = false;
    },

    [__getDetailComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetailComments.fulfilled]: (state, action) => {
      state.findData = action.payload;
      state.isLoading = false;
    },
    [__getDetailComments.rejected]: (state) => {
      state.isLoading = false;
    },

    [__updateComments.pending]: (state) => {
      state.isLoading = true;
    },

    [__updateComments.fulfilled]: (state, action) => {
      state.findData = action.payload;
      state.isLoading = false;
    },
    [__updateComments.rejected]: (state) => {
      state.isLoading = false;
    },

    [__postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__postComments.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
      state.isLoading = false;
    },
    [__postComments.rejected]: (state) => {
      state.isLoading = false;
    },

    [__deleteComments.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.isLoading = false;
    },
    [__deleteComments.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default commentsSlice.reducer;
export const { addComment, deleteComment, editComment, setCurrentCommentData } =
  commentsSlice.actions;
