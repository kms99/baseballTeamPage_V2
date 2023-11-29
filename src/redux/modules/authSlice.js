import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __signUpUser = createAsyncThunk(
  "signUpUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        payload
      );
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __loginUser = createAsyncThunk(
  "loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login?expiresIn=10m`,
        payload
      );
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user`,
        payload
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __updateProfile = createAsyncThunk(
  "updateProfile",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/profile`,
        payload
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const initialState = {
  isLoading: false,
  isError: false,
  userData: null,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  extraReducers: {
    [__signUpUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.successMessage = null;
    },
    [__signUpUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.successMessage = action.payload.message;
    },
    [__signUpUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    [__loginUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.successMessage = null;
    },
    [__loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = action.payload;
      state.successMessage = `${action.payload.nickname}님 환영합니다.`;
    },
    [__loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    [__getCurrentUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getCurrentUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = {
        ...state.userData,
        id: action.payload.id,
        nickname: action.payload.nickname,
        avatar: action.payload.avatar,
      };
    },
    [__getCurrentUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    [__updateProfile.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.successMessage = null;
    },
    [__updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = {
        ...state.userData,
        avatar: action.payload.avatar,
        nickname: action.payload.nickname,
      };
      state.successMessage = action.payload.message;
    },
    [__updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
