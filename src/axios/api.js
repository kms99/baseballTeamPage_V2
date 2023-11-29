import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  //요청을 보내기 전
  (config) => {
    return config;
  },
  //오류 요청을 보내기 후
  (err) => {
    toast.error(Promise.reject(err).data);
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
    return Promise.reject(err);
  }
);

export default instance;
