import React from "react";
import { initTeams } from "../../commonData";
import HeaderTitle from "./HeaderTitle";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";
import { useSelector } from "react-redux";
import HeaderLoginButton from "./HeaderLoginButton";

const Header = ({ children }) => {
  const selectTeam = useSelector((state) => state.teamSlice.currentTeamIndex);

  // Team Button 생성
  const teamButtons = initTeams.map((team, index) => (
    <HeaderButton key={team.team} title={team.text} value={index} />
  ));

  // 로그인 상태에 따른 버튼들
  const LOGIN_AREA_BUTTONS = [
    { id: 0, text: "로그인/회원가입", handler: null, isLogin: false },
    { id: 1, text: "내정보", handler: null, isLogin: true },
    { id: 2, text: "로그아웃", handler: null, isLogin: true },
  ];

  // 로그인 상태에 따라 버튼 필터링
  const loginButtons = LOGIN_AREA_BUTTONS.filter(
    (btn) => btn.isLogin === false
  ).map((btn) => (
    <HeaderLoginButton key={btn.id} text={btn.text} handler={btn.handler} />
  ));

  return (
    <>
      <StHeader selected={selectTeam}>
        <StLoginButtonArea>{loginButtons}</StLoginButtonArea>

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
  background: linear-gradient(
    ${(props) => props.theme.mainColor[initTeams[props.selected].team]},
    #000
  );
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
