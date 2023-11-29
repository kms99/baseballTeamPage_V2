import React from "react";
import styled from "styled-components";

const HeaderLoginButton = ({ handler, text }) => {
  return <StLoginButton onClick={handler}>{text}</StLoginButton>;
};
const StLoginButton = styled.button`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  & + button {
    margin-left: 1rem;
  }
`;
export default HeaderLoginButton;
