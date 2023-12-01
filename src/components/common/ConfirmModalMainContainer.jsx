import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import styled from "styled-components";
import { acceptConfirm, cancelConfirm } from "../../redux/modules/modalSlice";

const ConfirmModalMainContainer = () => {
  const modalInfo = useSelector((state) => state.modalSlice);
  const dispatch = useDispatch();
  const acceptConfirmHandler = () => {
    modalInfo.onConfirm();
    dispatch(cancelConfirm());
  };
  const cancelConfirmHandler = () => {
    dispatch(cancelConfirm());
  };
  const CONFIRM_MODAL_BUTTON = [
    { text: "확인", handler: acceptConfirmHandler },
    { text: "취소", handler: cancelConfirmHandler },
  ];
  return (
    <StConfirmModalContainerDiv>
      <h2>{modalInfo.confirmMessage}</h2>
      <div>
        {CONFIRM_MODAL_BUTTON.map((button) => (
          <Button
            key={button.text}
            text={button.text}
            handler={button.handler}
            style={{
              color: "#000000",
              hoverColor: "#FFFFFF",
              fontSize: "2rem",
            }}
          />
        ))}
      </div>
    </StConfirmModalContainerDiv>
  );
};

const StConfirmModalContainerDiv = styled.div`
  position: fixed;
  border-radius: 10px;
  width: 30%;
  height: auto;
  padding: 2rem 1rem;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  background-color: #e4e4e4;
  z-index: 20;
  & h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    font-weight: bold;
    border-bottom: 1px solid black;
    color: #000000;
  }
`;
export default ConfirmModalMainContainer;
