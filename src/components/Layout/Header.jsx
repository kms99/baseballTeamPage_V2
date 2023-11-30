import React from "react";
import { initTeams } from "../../commonData";
import HeaderTitle from "./HeaderTitle";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import HeaderLoginButton from "./HeaderLoginButton";
import { logoutUser } from "../../redux/modules/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectTeam = useSelector((state) => state.teamSlice.currentTeamIndex);

  const userData = useSelector((state) => state.authSlice.userData);

  // Team Button 생성
  const teamButtons = initTeams.map((team, index) => (
    <HeaderButton key={team.team} title={team.text} value={index} />
  ));

  const logOutHandler = () => {
    dispatch(logoutUser());
    toast.info("로그아웃 되었습니다.");
  };

  const goToProfilePage = () => {
    navigate("/profile");
  };

  // 로그인 버튼
  const LOGIN_AREA_BUTTONS = [
    { id: 0, text: "내정보", handler: goToProfilePage, isLogin: true },
    { id: 1, text: "로그아웃", handler: logOutHandler, isLogin: true },
  ];

  // 로그인 상태에 따라 버튼 필터링
  const loginButtons = LOGIN_AREA_BUTTONS.map((btn) => (
    <HeaderLoginButton key={btn.id} text={btn.text} handler={btn.handler} />
  ));

  return (
    <>
      <StHeader selected={selectTeam}>
        <StLoginButtonArea>{!!userData && loginButtons}</StLoginButtonArea>
        <HeaderTitle />
        <StButtonDiv>{teamButtons}</StButtonDiv>
      </StHeader>
      {children}
    </>
  );
};

// Styled Component
const StHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: linear-gradient(${(props) => props.theme.mainColor}, #000);
`;

const StButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const StLoginButtonArea = styled.div`
  position: absolute;
  right: 5rem;
  top: 20%;
  transform: translate(0 -50%);
`;

export default Header;
