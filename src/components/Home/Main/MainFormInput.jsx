import React from "react";
import styled from "styled-components";
import { initTeams } from "../../../commonData";
import { useSelector } from "react-redux";

const MainFormInput = ({ section, teamCommentValue, maxWidth }) => {
  const selectTeam = useSelector(({ team }) => team.currentTeamIndex);
  return (
    <StDiv>
      <StLabel selected={selectTeam}>{section.text}</StLabel>
      <StInput
        value={teamCommentValue}
        onChange={section.changeHandler}
        placeholder={`최대 ${maxWidth}글자까지 작성할 수 있습니다.`}
        maxLength={maxWidth}
        required
      />
    </StDiv>
  );
};

// styled components
const StInput = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  outline: none;
  border: 1px solid white;
  color: white;
  height: 3rem;
  font-size: 2rem;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  &::placeholder {
    font-size: 1rem;
    color: #ffffffa2;
  }
`;

const StDiv = styled.div`
  margin-bottom: 0.5rem;
`;

const StLabel = styled.label`
  font-weight: bold;
  color: ${(props) => props.theme.mainColor[initTeams[props.selected].team]};
`;
export default MainFormInput;
