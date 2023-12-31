import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import prevImg from "../style/image/prevBtn.svg";
import DetailPageCard from "../components/Detail/DetailPageCard";
import { useDispatch } from "react-redux";
import { __getDetailComments } from "../redux/modules/commentsSlice";
import { __getCurrentUser } from "../redux/modules/authSlice";

const Detail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getDetailComments(params.id));
  }, []);

  useEffect(() => {
    dispatch(__getCurrentUser());
  }, []);

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
