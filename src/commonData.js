import dosanlogo from "./style/image/logo/dosanlogo.svg";
import lglogo from "./style/image/logo/lglogo.svg";
import ktlogo from "./style/image/logo/ktlogo.svg";
import ssglogo from "./style/image/logo/ssglogo.svg";
import nclogo from "./style/image/logo/nclogo.svg";
import kialogo from "./style/image/logo/kialogo.svg";
import lottelogo from "./style/image/logo/lottelogo.svg";
import samsunglogo from "./style/image/logo/samsunglogo.svg";
import hanhwalogo from "./style/image/logo/hanhwalogo.svg";
import kiwoomlogo from "./style/image/logo/kiwoomlogo.svg";

export const initTeams = [
  {
    team: "dusan",
    text: "두산 베어스",
    logo: dosanlogo,
  },
  { team: "lg", text: "LG 트윈스", logo: lglogo },
  { team: "kt", text: "KT 위즈", logo: ktlogo },
  { team: "ssg", text: "SSG 랜더스", logo: ssglogo },
  { team: "nc", text: "NC 다이노스", logo: nclogo },
  { team: "kia", text: "KIA 타이거즈", logo: kialogo },
  {
    team: "lotte",
    text: "롯데 자이언츠",
    logo: lottelogo,
  },
  {
    team: "samsung",
    text: "삼성 라이온즈",
    logo: samsunglogo,
  },
  {
    team: "hanhwa",
    text: "한화 이글즈",
    logo: hanhwalogo,
  },
  {
    team: "kiwoom",
    text: "키움 히어로즈",
    logo: kiwoomlogo,
  },
];

export const dateFormat = (inputDate) => {
  const date = new Date(inputDate);
  const month = Math.floor((date.getMonth() + 1) / 10)
    ? date.getMonth() + 1
    : `0${date.getMonth() + 1}`;
  const day = Math.floor(date.getDate() / 10)
    ? date.getDate()
    : `0${date.getDate()}`;
  const hour = Math.floor(date.getHours() / 10)
    ? date.getHours()
    : `0${date.getHours()}`;
  const minute = Math.floor(date.getMinutes() / 10)
    ? date.getMinutes()
    : `0${date.getMinutes()}`;
  const second = Math.floor(date.getSeconds() / 10)
    ? date.getSeconds()
    : `0${date.getSeconds()}`;

  const commentDate = `${date.getFullYear()}/${month}/${day}  ${hour}:${minute}:${second}`;
  return commentDate;
};

export const LOGIN_SIGNUP_MODE = {
  login: {
    text: "로그인",
    changeModeText: "회원가입",
    changeModeLinkParams: "signUp",
    handler: null,
    showNickNameInput: false,
  },
  signUp: {
    text: "회원가입",
    changeModeText: "로그인",
    changeModeLinkParams: "login",
    handler: null,
    showNickNameInput: true,
  },
};
