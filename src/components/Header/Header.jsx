import React from "react";
import { initTeams } from "../../commonData";
import HeaderTitle from "./HeaderTitle";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";
import { useSelector } from "react-redux";

const Header = ({ children }) => {
  const selectTeam = useSelector(({ team }) => team.currentTeamIndex);
  // Team Button 생성
  const teamButtons = (
    <StButtonDiv>
      {initTeams.map((team, index) => (
        <HeaderButton key={team.team} title={team.text} value={index} />
      ))}
    </StButtonDiv>
  );

  return (
    <>
      <StHeader selected={selectTeam}>
        <HeaderTitle />
        {teamButtons}
      </StHeader>
      {children}
    </>
  );
};

// Styled Component
const StHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: linear-gradient(
    ${(props) => props.theme.mainColor[initTeams[props.selected].team]},
    #000
  );
`;

const StButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;
export default Header;
