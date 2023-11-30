import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// 회원가입
export const __signUpUser = createAsyncThunk(
  "signUpUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_API_URL}/register`,
        payload
      );

      toast.success(`회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.`);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);

      return thunkAPI.rejectWithValue();
    }
  }
);

// 로그인
export const __loginUser = createAsyncThunk(
  "loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_API_URL}/login?expiresIn=10m`,
        payload
      );

      toast.success(`${response.data.nickname}님 환영합니다.`);

      localStorage.setItem("token", response.data.accessToken);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error(err.response.data.message);

      return thunkAPI.rejectWithValue();
    }
  }
);

// 유저정보 확인
export const __getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (payload, thunkAPI) => {
    // 확인을 위한 Header 구성
    const userToken = localStorage.getItem("token");

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_USER_API_URL}/user`,
        headers
      );

      toast.success(`${response.data.nickname}님 환영합니다.`);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error("로그인을 진행하세요");

      return thunkAPI.rejectWithValue();
    }
  }
);

export const __updateProfile = createAsyncThunk(
  "updateProfile",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_USER_API_URL}/profile`,
        payload
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const defaultValue = {
  isLoading: false,
  isLogin: false,
  userData: null,
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
    },
    [__signUpUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__signUpUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [__loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__loginUser.fulfilled]: (state, action) => {
      const { userId, success, avatar, nickname } = action.payload;
      state.isLoading = false;
      state.userData = { userId, success, avatar, nickname };
      state.isLogin = true;
    },
    [__loginUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [__getCurrentUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCurrentUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.isLogin = true;
    },
    [__getCurrentUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [__updateProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
    },
    [__updateProfile.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
