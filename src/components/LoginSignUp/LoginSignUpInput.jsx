import React from "react";
import styled from "styled-components";
const LoginSignUpInput = ({
  placeholder,
  type,
  keyValue,
  setUserAuthInput,
  userAuthInput,
}) => {
  const inputValueChangeHandler = (e) => {
    setUserAuthInput((prev) => {
      return { ...prev, [keyValue]: e.target.value };
    });
  };
  return (
    <StInput
      placeholder={placeholder}
      type={type}
      onChange={inputValueChangeHandler}
      value={userAuthInput[keyValue]}
    ></StInput>
  );
};

const StInput = styled.input`
  height: 5rem;
  font-size: 2rem;
  margin-bottom: 2rem;
  background: unset;
  outline: none;
  border: none;
  border-bottom: 2px solid black;
`;

export default LoginSignUpInput;
