import React from "react";

const DetailPageCommentModifyBtn = ({ btnText, clickEventHandler }) => {
  return <button onClick={clickEventHandler}>{btnText}</button>;
};
export default DetailPageCommentModifyBtn;
