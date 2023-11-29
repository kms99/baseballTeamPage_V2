import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginSignUpInput from "./LoginSignUpInput";
import { useDispatch } from "react-redux";
import { __loginUser, __signUpUser } from "../../redux/modules/authSlice";

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

  const [userAuthInput, setUserAuthInput] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (mode === "signUp") {
      const signUpData = userAuthInput;
      dispatch(__signUpUser(signUpData));
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
      <button>{currentMode.text}</button>
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
  & button {
    height: 5rem;
    font-size: 2.5rem;
    cursor: pointer;
    background: unset;
    border: black 2px solid;
    margin-bottom: 3rem;
  }

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

export default LoginSignUpForm;
