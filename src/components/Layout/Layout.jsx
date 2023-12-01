import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { __getComments } from "../../redux/modules/commentsSlice";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
