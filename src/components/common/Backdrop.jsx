import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { cancelConfirm } from "../../redux/modules/modalSlice";

const Backdrop = () => {
  const visible = useSelector((state) => state.modalSlice.visible);
  const dispatch = useDispatch();
  const backdropClickHandler = () => {
    dispatch(cancelConfirm());
  };
  return <StBackDropDiv $visible={visible} onClick={backdropClickHandler} />;
};

const StBackDropDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${(props) => (props.$visible ? "5" : "-5")};
  opacity: ${(props) => (props.$visible ? "1" : "0")};
  transition: opacity 0.3s;
  background: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
