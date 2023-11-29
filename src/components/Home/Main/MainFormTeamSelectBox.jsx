import React from "react";
import { initTeams } from "../../../commonData";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setTeam } from "../../../redux/modules/team";

const MainFormTeamSelectBox = () => {
  const selectTeam = useSelector(({ team }) => team.currentTeamIndex);
  const dispatch = useDispatch();

  const commentSelectTeamHandler = (e) => {
    dispatch(setTeam(parseInt(e.target.value)));
  };

  const teamOption = initTeams.map((team, index) => {
    return (
      <option value={index} key={team.team}>
        {team.text}
      </option>
    );
  });

  return (
    <>
      <StSelectLabelDiv selected={selectTeam}>팀 선택</StSelectLabelDiv>
      <StSelect value={selectTeam} onChange={commentSelectTeamHandler}>
        {teamOption}
      </StSelect>
    </>
  );
};

// styled components
const StSelect = styled.select`
  width: 100%;
  height: 3rem;
  outline: none;
  cursor: pointer;
  font-size: 1%.5;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: 1px solid white;
  margin: 0.5rem 0 0.5rem 0;
`;

const StSelectLabelDiv = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.mainColor[initTeams[props.selected].team]};
`;

export default MainFormTeamSelectBox;
