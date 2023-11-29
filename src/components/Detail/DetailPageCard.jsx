import React from "react";
import styled from "styled-components";
import DetailPageCardUser from "./DetailPageCardUser";
import DetailPageCardCommentContainer from "./DetailPageCardCommentContainer";

const DetailPageCard = () => {
  return (
    <StInfoDiv>
      <DetailPageCardUser />
      <DetailPageCardCommentContainer />
    </StInfoDiv>
  );
};

// styled components
const StInfoDiv = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5rem 0;
`;

export default DetailPageCard;
