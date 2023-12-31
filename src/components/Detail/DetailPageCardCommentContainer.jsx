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
  __deleteComments,
  __getComments,
  __getDetailComments,
  __updateComments,
} from "../../redux/modules/commentsSlice";
import { openModal } from "../../redux/modules/modalSlice";

const DetailPageCardCommentContainer = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const findData = useSelector((state) => state.commentsSlice.findData); //userId

  const currentUser = useSelector((state) => state.authSlice.userData); //userId

  const [modifyMode, setModifyMode] = useState(false);

  const [modifyValue, setModifyValue] = useState("");

  const formatDate = dateFormat(findData.createdAt);

  useEffect(() => {
    setModifyValue(findData.content);
  }, [findData]);

  const changeModifyModeHandler = () => {
    setModifyMode((prev) => {
      if (prev) {
        setModifyValue(findData.content);
        return false;
      } else {
        return true;
      }
    });
  };

  const modifyValueChangeHandler = (e) => {
    setModifyValue(e.target.value);
  };

  const modifyDoneEvent = () => {
    dispatch(
      __updateComments({
        updateTargetId: findData.id,
        updateData: { content: modifyValue },
      })
    );
    dispatch(__getComments());
    setModifyMode(false);
  };

  const modifyDoneClickHandler = () => {
    if (findData.comment === modifyValue) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    dispatch(
      openModal({
        message: "글을 수정하시겠습니까?",
        onConfirm: modifyDoneEvent,
      })
    );
  };

  const deleteCommentEvent = () => {
    dispatch(__deleteComments(findData.id));
    navigate("/");
  };

  const deleteCommentClickHandler = () => {
    dispatch(
      openModal({
        message: "글을 삭제하시겠습니까?",
        onConfirm: deleteCommentEvent,
      })
    );
  };

  const modifyModeCommentArea = modifyMode ? (
    <StUserCommentTextArea
      value={modifyValue}
      maxLength={100}
      onChange={modifyValueChangeHandler}
    />
  ) : (
    <StUserComment>{findData.content}</StUserComment>
  );

  return (
    <StUserCommentContainer>
      <StDate>{formatDate}</StDate>
      <StCommentButtonContainer
        $myPost={findData.userId === currentUser.userId}
      >
        <DetailPageCardButton
          buttonImg={modifyImg}
          buttonEventHandler={changeModifyModeHandler}
        />
        <DetailPageCardButton
          buttonImg={deleteImg}
          buttonEventHandler={deleteCommentClickHandler}
        />
      </StCommentButtonContainer>
      {modifyModeCommentArea}
      <StModifyDoneButtons $modify={modifyMode}>
        <DetailPageCommentModifyBtn
          btnText="수정완료"
          clickEventHandler={modifyDoneClickHandler}
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
  padding: 2rem;
  height: 80%;
  line-height: 2.5rem;
  white-space: pre-line;
  overflow-y: scroll;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
  display: ${(props) => (props.$myPost ? "block" : "none")};
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
