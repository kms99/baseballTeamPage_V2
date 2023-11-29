import React, { useEffect, useState } from "react";
import { initTeams } from "../../../commonData";
import MainFormButton from "./MainFormButton";
import MainFormTeamSelectBox from "./MainFormTeamSelectBox";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import avatar from "../../../style/image/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../redux/modules/commentsSlice";
import MainFormTextarea from "./MainFormTextarea";

const MainForm = () => {
  const selectTeam = useSelector((state) => state.teamSlice.currentTeamIndex);

  const [commentsTextAreaValue, setCommentsTextAreaValue] = useState("");

  const dispatch = useDispatch();

  const userNickname = useSelector(
    (state) => state.authSlice.userData.nickname
  );

  // 팀변경시 input 값 초기화
  useEffect(() => {
    setCommentsTextAreaValue("");
  }, [selectTeam]);
  //   form submit 이벤트
  const teamCommentSubmitHandler = (e) => {
    e.preventDefault();
    // 부모 컴포넌트에 건내줄 새로운 배열
    const newComment = {
      nickname: userNickname,
      comment: commentsTextAreaValue,
      team: initTeams[selectTeam].text,
      id: uuidv4(),
      date: new Date().getTime(),
      avatar,
    };
    // input 값 초기화
    setCommentsTextAreaValue("");
    dispatch(addComment(newComment));
  };

  //comment Value Handler
  const commentTextareaChangeHandler = (e) => {
    setCommentsTextAreaValue(e.target.value);
  };

  return (
    <StForm selected={selectTeam} onSubmit={teamCommentSubmitHandler}>
      <StImageDiv selected={selectTeam}></StImageDiv>
      <div>
        <MainFormTeamSelectBox />
        <StNicknameContainer>
          <label>닉네임</label>
          <span>{userNickname}</span>
        </StNicknameContainer>
        <MainFormTextarea
          commentTextareaChangeHandler={commentTextareaChangeHandler}
          commentsTextAreaValue={commentsTextAreaValue}
        />
        <MainFormButton text="작성하기" />
      </div>
    </StForm>
  );
};

// styled components
const StForm = styled.form`
  border: 5px solid ${(props) => props.theme.mainColor};
  border-radius: 20px;
  width: 50rem;
  height: auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  background: ${(props) => props.theme.subColor};
  & label {
    font-weight: bold;
    color: ${(props) => props.theme.mainColor};
    font-size: 1.5rem;
  }
`;

const StImageDiv = styled.div`
  width: 10rem;
  height: 10rem;
  background: url(${(props) => initTeams[props.selected].logo});
  background-size: contain;
  background-repeat: no-repeat;
`;

const StNicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  font-size: 1.3rem;
  & span {
    font-size: 2rem;
  }
`;
export default MainForm;
