import React from "react";
import styled from "styled-components";

const DetailPageCardButton = ({ buttonImg, buttonEventHandler }) => {
  return <StBtn $img={buttonImg} onClick={buttonEventHandler}></StBtn>;
};

// styled components
const StBtn = styled.button`
  background: url(${(props) => props.$img});
  background-size: cover;
  background-position: center;
  width: 2rem;
  height: 2rem;
  border: none;
  cursor: pointer;
`;

export default DetailPageCardButton;
