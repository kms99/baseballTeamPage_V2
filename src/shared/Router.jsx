import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header/Header";
import { Home, Detail, Login, Profile } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default Router;
