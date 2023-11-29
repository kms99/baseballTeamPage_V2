import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detail, LoginSignUp, Profile, PrivateRoute } from "../pages";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="loginSignUp/:mode" element={<LoginSignUp />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
