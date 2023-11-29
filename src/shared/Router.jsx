import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import { Home, Detail, LoginSignUp, Profile } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="loginSignUp/:mode" element={<LoginSignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default Router;
