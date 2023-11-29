import React from "react";
import styled from "styled-components";
import { initTeams } from "../../../commonData";
import { useSelector } from "react-redux";

const MainFormButton = ({ text }) => {
  const selectTeam = useSelector((state) => state.teamSlice.currentTeamIndex);

  return (
    <StFormButton type="submit" selected={selectTeam}>
      {text}
    </StFormButton>
  );
};

// styled components
const StFormButton = styled.button`
  width: 100%;
  height: 3rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.mainColor};
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 1rem;

  &:active,
  &:hover {
    background: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.subColor};
  }
`;

export default MainFormButton;
