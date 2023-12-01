import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Detail, LoginSignUp, Profile, Home } from "../pages";
import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";

const Router = () => {
  const isLogin = useSelector((state) => state.authSlice.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="loginSignUp/:mode" element={<LoginSignUp />} />
        <Route
          path="/"
          element={isLogin ? <Layout /> : <Navigate to="loginSignUp/login" />}
        >
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
