import React from "react";
import { useParams } from "react-router-dom";
import { LOGIN_SIGNUP_MODE } from "../commonData";
import LoginSignUpForm from "../components/LoginSignUp/LoginSignUpForm";
import styled from "styled-components";

const LoginSignUp = () => {
  const params = useParams().mode;
  const currentMode = LOGIN_SIGNUP_MODE[params];
  return (
    <StContainerDiv>
      <h1>{currentMode.text}</h1>
      <LoginSignUpForm currentMode={currentMode} mode={params} />
    </StContainerDiv>
  );
};

const StContainerDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 80%;
  border-radius: 10px;
  height: auto;
  margin: auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h1 {
    margin-bottom: 3rem;
    font-size: 3rem;
    font-weight: bold;
  }
`;

export default LoginSignUp;
