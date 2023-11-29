import dosanlogo from "./image/logo/dosanlogo.svg";
import lglogo from "./image/logo/lglogo.svg";
import ktlogo from "./image/logo/ktlogo.svg";
import ssglogo from "./image/logo/ssglogo.svg";
import nclogo from "./image/logo/nclogo.svg";
import kialogo from "./image/logo/kialogo.svg";
import lottelogo from "./image/logo/lottelogo.svg";
import samsunglogo from "./image/logo/samsunglogo.svg";
import hanhwalogo from "./image/logo/hanhwalogo.svg";
import kiwoomlogo from "./image/logo/kiwoomlogo.svg";

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
