import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../axios/api";
import { toast } from "react-toastify";

export const __signUpUser = createAsyncThunk(
  "signUpUser",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/register", payload);
      toast.success(`회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __loginUser = createAsyncThunk(
  "loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await api.post("/login?expiresIn=10m", payload);
      toast.success(`${response.data.nickname}님 환영합니다.`);
      console.log(response.data);
      localStorage.setItem("token", response.data.accessToken);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/user", payload);
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __updateProfile = createAsyncThunk(
  "updateProfile",
  async (payload, thunkAPI) => {
    try {
      const response = await api.patch("/profile", payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const defaultValue = {
  isLoading: false,
  isError: false,
  isLogin: false,
  userData: null,
  error: null,
};

const initialState = {
  ...defaultValue,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      return { ...state, ...defaultValue };
    },
  },
  extraReducers: {
    [__signUpUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__signUpUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
    },
    [__signUpUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    [__loginUser.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__loginUser.fulfilled]: (state, action) => {
      const { userId, success, avatar, nickname } = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.userData = { userId, success, avatar, nickname };
      state.isLogin = true;
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
      state.userData = action.payload;
      state.isLogin = true;
    },
    [__getCurrentUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    [__updateProfile.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.userData = action.payload;
    },
    [__updateProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
