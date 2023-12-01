import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_LETTERS_API_URL,
});

instance.interceptors.request.use(
  //요청을 보내기 전
  async (config) => {
    const token = localStorage.getItem("token");
    try {
      await axios.get(`${process.env.REACT_APP_USER_API_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return config;
    } catch (err) {
      console.log(err);
      const error = new Error(
        "로그인 정보가 잘못되었습니다. 게시물을 불러올 수 없습니다."
      );
      return Promise.reject(error);
    }
  },

  //오류 요청을 보내기 후
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  //응답을 내보내기 전
  (config) => {
    return config;
  },
  //오류를 내보내기 전
  (err) => {
    // TODO JWT 인증서버 API 확인
    window.location.reload();
    return Promise.reject(err);
  }
);

export default instance;
