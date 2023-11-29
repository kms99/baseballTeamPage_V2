import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import prevImg from "../image/prevBtn.svg";
import DetailPageCard from "../components/Detail/DetailPageCard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCommentData } from "../redux/modules/comment";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  dispatch(setCurrentCommentData(params.id));

  return (
    <div>
      <StDetailDiv>
        <StToHomeLink>
          <Link to="/">
            <img src={prevImg} />
            <span>홈으로</span>
          </Link>
        </StToHomeLink>
        <DetailPageCard />
      </StDetailDiv>
    </div>
  );
};

const StDetailDiv = styled.div`
  position: relative;
  margin: auto;
  width: 80%;
  height: 50rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  display: flex;
  align-items: start;
  justify-content: center;
`;

const StToHomeLink = styled.div`
  position: absolute;
  left: 2rem;
  top: 2rem;
  & a {
    display: flex;
    align-items: center;
    font-size: 2rem;
    text-decoration: none;
    color: black;
  }
  & a img {
    margin-right: 1rem;
  }
`;

export default Detail;
