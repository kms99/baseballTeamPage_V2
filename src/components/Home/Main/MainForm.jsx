import React, { useEffect, useState } from "react";
import MainFormInput from "./MainFormInput";
import { initTeams } from "../../../commonData";
import MainFormButton from "./MainFormButton";
import MainFormTeamSelectBox from "./MainFormTeamSelectBox";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import avata from "../../../image/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../redux/modules/comment";

// form 입력 부분 최초값
const initInputData = {
  user: "",
  comment: "",
};

const MainForm = () => {
  const selectTeam = useSelector(({ team }) => team.currentTeamIndex);

  // form 입력 값 저장 state
  // 해당 State는 다른 곳에서 사용되는 것이 아닌, 직계 자식 컴포넌트에서만 사용되기 때문에 Context화 하지 않았음.
  const [inputData, setInputData] = useState(initInputData);
  const dispatch = useDispatch();

  // 팀변경시 input 값 초기화
  useEffect(() => {
    setInputData(initInputData);
  }, [selectTeam]);

  //   form submit 이벤트
  const teamCommentSubmitHandler = (e) => {
    e.preventDefault();

    // 부모 컴포넌트에 건내줄 새로운 배열
    const newComment = {
      ...inputData,
      team: initTeams[selectTeam].text,
      id: uuidv4(),
      date: new Date(),
      avatar: avata,
    };

    // input 값 초기화
    setInputData(initInputData);
    // 부모 컴포넌트의 함수를 이용한 값 전달
    dispatch(addComment(newComment));
  };

  //   input value state 저장 하기 위한 changeEventHandler
  //   (1)user Value Handler
  const userInputChangeHandler = (e) => {
    setInputData((prev) => {
      return { ...prev, user: e.target.value };
    });
  };
  // (2)comment Value Handler
  const commentInputChangeHandler = (e) => {
    setInputData((prev) => {
      return { ...prev, comment: e.target.value };
    });
  };

  //   MainFormInput을 동적생성하기 위한 배열
  const inputSection = [
    {
      key: "user",
      text: "닉네임",
      changeHandler: userInputChangeHandler,
      maxWidth: 20,
    },
    {
      key: "comment",
      text: "응원의 말",
      changeHandler: commentInputChangeHandler,
      maxWidth: 100,
    },
  ];

  // MainFormInput 동적생성
  const formInputMapping = inputSection.map((section) => {
    return (
      <MainFormInput
        key={section.key}
        section={section}
        teamCommentValue={inputData[section.key]}
        maxWidth={section.maxWidth}
      />
    );
  });

  return (
    <StForm selected={selectTeam} onSubmit={teamCommentSubmitHandler}>
      <StImageDiv selected={selectTeam}></StImageDiv>
      <div>
        <MainFormTeamSelectBox />
        {formInputMapping}
        <MainFormButton>작성하기</MainFormButton>
      </div>
    </StForm>
  );
};

// styled components
const StForm = styled.form`
  border: 5px solid
    ${(props) => props.theme.mainColor[initTeams[props.selected].team]};
  border-radius: 20px;
  width: 50rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  background: ${(props) =>
    props.theme.subColor[initTeams[props.selected].team]};
`;

const StImageDiv = styled.div`
  width: 10rem;
  height: 10rem;
  background: url(${(props) => initTeams[props.selected].logo});
  background-size: contain;
  background-repeat: no-repeat;
`;
export default MainForm;
