import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { __getComments } from "../../redux/modules/commentsSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();

  // 게시물 가져오기
  useEffect(() => {
    dispatch(__getComments());
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
