import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dateFormat } from "../../../commonData";

const MainCard = ({ filteredComment }) => {
  const commentDate = dateFormat(filteredComment.date);

  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`detail/${filteredComment.id}`);
  };
  return (
    <StLi key={filteredComment.id} onClick={navigateToDetail}>
      <StDateDiv>{commentDate}</StDateDiv>

      <StUserImg $img={filteredComment.avatar}></StUserImg>
      <StCommentFirstLineDiv>
        <StTeamNameH3>{filteredComment.team}</StTeamNameH3>
        <StUserNameH2>{filteredComment.user} 님</StUserNameH2>
      </StCommentFirstLineDiv>

      <StCommentP>{filteredComment.comment}</StCommentP>
    </StLi>
  );
};

// styled components
const StLi = styled.li`
  width: 100%;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const StTeamNameH3 = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const StUserNameH2 = styled.h2`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
`;

const StCommentP = styled.p`
  font-size: 1.3rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StCommentFirstLineDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4.5rem;
  align-items: start;
`;

const StUserImg = styled.div`
  ${({ $img }) => ($img ? `background-image:url(${$img});` : "")}
  width: 4rem;
  height: 4rem;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  position: absolute;
`;
const StDateDiv = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;
export default MainCard;
