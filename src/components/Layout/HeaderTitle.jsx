import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderTitle = () => {
  const navigate = useNavigate();
  const selectTeam = useSelector((state) => state.teamSlice.currentTeamIndex);

  const goToHomeHandler = () => {
    navigate("/");
  };

  return (
    <StTitle selected={selectTeam} onClick={goToHomeHandler}>
      프로야구 TALK
    </StTitle>
  );
};

//styled components
const StTitle = styled.h1`
  font-size: 4rem;
  font-family: "BlackHanSans", sans-serif;
  color: ${(props) => props.theme.subColor};
  transition: all 0.5s;
  cursor: pointer;
`;
export default HeaderTitle;
