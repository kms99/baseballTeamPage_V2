import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const DetailPageCardUser = () => {
  const findData = useSelector(({ comment }) => comment.findData);
  return (
    <StUser>
      <StUserImg $img={findData.avatar}></StUserImg>
      <StUserName>{findData.user}</StUserName>
      <StTeam>{findData.team}</StTeam>
    </StUser>
  );
};

// styled components
const StUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;
const StUserImg = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  ${({ $img }) => ($img ? `background-image:url(${$img});` : "")}
  background-position:center;
  background-size: cover;
  margin-bottom: 1rem;
`;
const StUserName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;
const StTeam = styled.div`
  margin-top: 0.5rem;
  font-size: 1.2rem;
`;
export default DetailPageCardUser;
