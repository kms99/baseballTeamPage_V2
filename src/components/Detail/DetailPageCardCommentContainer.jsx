import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dateFormat } from "../../commonData";
import modifyImg from "../../style/image/modify.svg";
import deleteImg from "../../style/image/delete.svg";
import DetailPageCardButton from "./DetailPageCardButton";
import { useNavigate } from "react-router-dom";
import DetailPageCommentModifyBtn from "./DetailPageCommentModifyBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  editComment,
  setCurrentCommentData,
} from "../../redux/modules/commentsSlice";

const DetailPageCardCommentContainer = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const findData = useSelector((state) => state.commentsSlice.findData);

  const [modifyMode, setModifyMode] = useState(false);

  const [modifyValue, setModifyValue] = useState(findData.comment);

  const formatDate = dateFormat(findData.date);

  const changeModifyModeHandler = () => {
    setModifyMode((prev) => {
      if (prev) {
        setModifyValue(findData.comment);
        return false;
      } else {
        return true;
      }
    });
  };

  const modifyValueChangeHandler = (e) => {
    setModifyValue(e.target.value);
  };

  const modifyDoneHandler = () => {
    if (findData.comment === modifyValue) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    dispatch(editComment(modifyValue));
    dispatch(setCurrentCommentData(findData.id));

    setModifyMode(false);
  };

  const deleteCommentHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(deleteComment());
      navigate("/");
    }
  };

  const modifyModeCommentArea = modifyMode ? (
    <StUserCommentTextArea
      value={modifyValue}
      maxLength={100}
      onChange={modifyValueChangeHandler}
    />
  ) : (
    <StUserComment>{findData.comment}</StUserComment>
  );

  return (
    <StUserCommentContainer>
      <StDate>{formatDate}</StDate>
      <StCommentButtonContainer>
        <DetailPageCardButton
          buttonImg={modifyImg}
          buttonEventHandler={changeModifyModeHandler}
        />
        <DetailPageCardButton
          buttonImg={deleteImg}
          buttonEventHandler={deleteCommentHandler}
        />
      </StCommentButtonContainer>
      {modifyModeCommentArea}
      <StModifyDoneButtons $modify={modifyMode}>
        <DetailPageCommentModifyBtn
          btnText="수정완료"
          clickEventHandler={modifyDoneHandler}
        />
        <DetailPageCommentModifyBtn
          btnText="취소"
          clickEventHandler={changeModifyModeHandler}
        />
      </StModifyDoneButtons>
    </StUserCommentContainer>
  );
};

// styled components
const StUserCommentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StUserComment = styled.p`
  font-size: 2rem;
  word-break: break-all;
  width: 100%;
  padding: 2rem;
  line-height: 2.5rem;
`;

const StUserCommentTextArea = styled.textarea`
  font-size: 2rem;
  width: 95%;
  height: 50%;
  resize: none;
`;
const StDate = styled.span`
  color: gray;
  position: absolute;
  border-bottom: 2px solid gray;
  line-height: 2rem;
  font-size: 1.2rem;
  top: 0.5rem;
  left: 1rem;
`;

const StCommentButtonContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  & button + button {
    margin-left: 1rem;
  }
`;

const StModifyDoneButtons = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: ${(props) => (props.$modify ? "block" : "none")};
  & button {
    font-size: 1.5rem;
    padding: 1rem;
    cursor: pointer;
    font-weight: bold;
  }
  & button + button {
    margin-left: 1rem;
  }
`;
export default DetailPageCardCommentContainer;
