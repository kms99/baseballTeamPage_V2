import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import styled from "styled-components";
import { cancelConfirm } from "../../redux/modules/modalSlice";

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
  const modalVisible = useSelector((state) => state.modalSlice.visible);
  console.log(modalVisible);
  return (
    <StConfirmModalContainerDiv $modalVisible={modalVisible}>
      <h1>프로야구 Talk</h1>
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
  width: auto;
  height: auto;
  padding: 5rem 2rem 3rem 2rem;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  background-color: #e4e4e4;
  box-shadow: 1px 3px 18px -4px #555555;
  z-index: ${(props) => (props.$modalVisible ? "10" : "-10")};
  opacity: ${(props) => (props.$modalVisible ? "1" : "0")};
  transition: opacity 0.3s;
  & h1 {
    position: absolute;
    left: 2rem;
    top: 1.5rem;
    font-family: "BlackHanSans", sans-serif;
    color: ${(props) => props.theme.subColor};
    font-size: 1.5rem;
  }
  & h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    font-weight: bold;
    border-bottom: 2px solid black;
    color: #000000;
  }
`;
export default ConfirmModalMainContainer;
