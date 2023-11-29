import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MainFormTextarea = ({
  contentTextAreaValue,
  contentTextareaChangeHandler,
}) => {
  const selectTeam = useSelector((state) => state.teamSlice.currentTeamIndex);
  return (
    <StDiv>
      <label selected={selectTeam}>응원의 말</label>
      <StTextarea
        value={contentTextAreaValue}
        onChange={contentTextareaChangeHandler}
        placeholder={`최대 100글자까지 작성할 수 있습니다.`}
        maxLength={100}
        required
      />
    </StDiv>
  );
};

// styled components
const StTextarea = styled.textarea`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  outline: none;
  border: 1px solid white;
  color: white;
  height: 10rem;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  padding: 1rem;
  font-family: inherit;
  resize: none;
  &::placeholder {
    font-size: 1.3rem;
    color: #ffffffa2;
  }
`;

const StDiv = styled.div`
  margin-bottom: 0.5rem;
`;

export default MainFormTextarea;
