import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import ConfirmModalMainContainer from "./ConfirmModalMainContainer";

const ConfirmModal = () => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backDrop"))}
      {ReactDOM.createPortal(
        <ConfirmModalMainContainer />,
        document.getElementById("confirmModal")
      )}
    </>
  );
};

export default ConfirmModal;
