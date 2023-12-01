import React from "react";
import styled from "styled-components";

const Button = ({ text, handler, style }) => {
  return (
    <StButton
      onClick={handler}
      $mainColor={style.color}
      $hoverColor={style.hoverColor}
      $fontSize={style.fontSize}
    >
      {text}
    </StButton>
  );
};

const StButton = styled.button`
  padding: 0.5rem 1rem;
  border: 2px solid ${(props) => props.$mainColor};
  color: ${(props) => props.$mainColor};
  font-size: ${(props) => props.$fontSize};
  font-weight: bold;
  background: transparent;
  cursor: pointer;
  margin: 0 1rem;

  &:active,
  &:hover {
    color: ${(props) => props.$hoverColor};
    background: ${(props) => props.$mainColor};
  }
`;
export default Button;
