import React from "react";
import styled from "styled-components";

const ProfileAvatarArea = ({
  editProfileValue,
  userAvatarImageChangeHandler,
  profileEditMode,
}) => {
  return (
    <StAvatarImageFigure>
      <img src={editProfileValue.avatarPreview} />
      {profileEditMode ? <label htmlFor="avatarImage">파일 선택</label> : null}
      <input
        id="avatarImage"
        onChange={userAvatarImageChangeHandler}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        style={{ display: "none" }}
        files={editProfileValue.avatar}
        value={editProfileValue.avatarName || ""}
      />
    </StAvatarImageFigure>
  );
};
const StAvatarImageFigure = styled.figure`
  position: relative;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin-bottom: 2rem;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  & label {
    color: white;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
`;
export default ProfileAvatarArea;
