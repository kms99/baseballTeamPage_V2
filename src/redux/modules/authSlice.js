import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import avatar from "../../style/image/avatar.png";

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
    const convertURLtoFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob();
      const ext = url.split(".").pop();
      const filename = url.split("/").pop();
      const metadata = { type: `image/${ext}` };
      return new File([data], filename, metadata);
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_API_URL}/login?expiresIn=10m`,
        payload
      );

      toast.success(`${response.data.nickname}님 환영합니다.`);

      localStorage.setItem("token", response.data.accessToken);

      if (!response.data.avatar) {
        const fileRef = await convertURLtoFile(avatar);
        await axios.patch(
          `${process.env.REACT_APP_USER_API_URL}/profile`,
          { avatar: fileRef },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${response.data.accessToken}`,
            },
          }
        );
      }

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

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      toast.error("로그인을 진행하세요");

      return thunkAPI.rejectWithValue();
    }
  }
);

// 프로필 업데이트
export const __updateProfile = createAsyncThunk(
  "updateProfile",
  async (payload, thunkAPI) => {
    const token = localStorage.getItem("token");
    const updateCommentsUserData = async (id, changeUserInfo) => {
      await axios.patch(`http://localhost:4000/letters/${id}`, changeUserInfo);
    };
    try {
      // 프로필 업데이트 실행
      const response = await axios.patch(
        `${process.env.REACT_APP_USER_API_URL}/profile`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 프로필 업데이트에 따른 게시물 업데이트
      // (1) 변경 데이터 제작
      const changeUserInfo = {};
      if (response.data.nickname)
        changeUserInfo["nickname"] = response.data.nickname;
      if (response.data.avatar) changeUserInfo["avatar"] = response.data.avatar;

      // (2) 변경할 문서 아이디 가져오기 (현재 유저와 같은 아이디인 게시물)
      const targetCommentsId = thunkAPI
        .getState()
        .commentsSlice.comments.filter(
          (comment) => comment.userId === payload.userId
        )
        .map((comment) => comment.id);

      // (3) 변경할 문서에 변경데이터를 업데이트
      for (let id of targetCommentsId) {
        await updateCommentsUserData(id, changeUserInfo);
      }

      toast.success(response.data.message);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
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
      const { userId, avatar, nickname } = action.payload;
      state.isLoading = false;
      state.userData = { userId, avatar, nickname };
      state.isLogin = true;
    },
    [__loginUser.rejected]: (state) => {
      state.isLoading = false;
    },

    [__getCurrentUser.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCurrentUser.fulfilled]: (state, action) => {
      const { id, avatar, nickname } = action.payload;
      state.isLoading = false;
      state.userData = { userId: id, avatar, nickname };
      state.isLogin = true;
    },
    [__getCurrentUser.rejected]: (state) => {
      state.isLoading = false;
      state.isLogin = false;
    },

    [__updateProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateProfile.fulfilled]: (state, action) => {
      const { avatar, nickname } = action.payload;
      state.isLoading = false;
      state.userData = {
        ...state.userData,
        avatar: avatar || state.userData.avatar,
        nickname: nickname || state.userData.nickname,
      };
    },
    [__updateProfile.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
export const { logoutUser } = authSlice.actions;
