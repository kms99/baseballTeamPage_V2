import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginSignUpInput from "./LoginSignUpInput";
import { useDispatch, useSelector } from "react-redux";
import { __loginUser, __signUpUser } from "../../redux/modules/authSlice";
import { toast } from "react-toastify";

const INPUT_TYPE = [
  { mode: "all", placeholder: "아이디 (4~10글자)", type: "text", key: "id" },
  {
    mode: "all",
    placeholder: "비밀번호 (4~15글자)",
    type: "password",
    key: "password",
  },
  {
    mode: "signUp",
    placeholder: "닉네임 (1~10글자)",
    type: "text",
    key: "nickname",
  },
];

const LoginSignUpForm = ({ currentMode, mode }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.authSlice.isLogin);

  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin]);

  const [userAuthInput, setUserAuthInput] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const validationCheck = (str, range) => {
    if (range[0] <= str.length && str.length <= range[1]) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // validation check
    if (!validationCheck(userAuthInput.id, [4, 10])) {
      toast.warning("아이디를 4~10글자 사이로 입력해주세요.");
      return;
    }
    if (!validationCheck(userAuthInput.password, [4, 15])) {
      toast.warning("비밀번호를 4~15글자 사이로 입력해주세요.");
      return;
    }
    if (
      !validationCheck(userAuthInput.nickname, [1, 10]) &&
      mode === "signUp"
    ) {
      toast.warning("닉네임을 1~10글자 사이로 입력해주세요.");
      return;
    }

    if (mode === "signUp") {
      const signUpData = userAuthInput;
      dispatch(__signUpUser(signUpData));
      navigate("/loginSignUp/login");
      setUserAuthInput({ id: "", password: "", nickname: "" });
    } else if (mode === "login") {
      const { id, password } = userAuthInput;
      const loginData = { id, password };
      dispatch(__loginUser(loginData));
    }
  };

  const inputElements = INPUT_TYPE.filter((input) => {
    return input.mode === "all" || input.mode === mode;
  }).map((input) => (
    <LoginSignUpInput
      key={input.key}
      placeholder={input.placeholder}
      type={input.type}
      keyValue={input.key}
      setUserAuthInput={setUserAuthInput}
      userAuthInput={userAuthInput}
    />
  ));

  return (
    <StForm onSubmit={onSubmitHandler}>
      {inputElements}
      <StButton>{currentMode.text}</StButton>
      <Link to={`/loginSignUp/${currentMode.changeModeLinkParams}`}>
        {currentMode.changeModeText}
      </Link>
    </StForm>
  );
};

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;

  & a {
    width: fit-content;
    margin: auto;
    text-decoration: none;
    color: #313131;
    font-size: 1.5rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StButton = styled.button`
  height: 5rem;
  font-size: 2.5rem;
  cursor: pointer;
  background: unset;
  border: black 2px solid;
  margin-bottom: 3rem;
`;

export default LoginSignUpForm;
