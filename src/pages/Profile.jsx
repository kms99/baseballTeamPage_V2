import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { __getCurrentUser, __updateProfile } from "../redux/modules/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.authSlice.userData);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const [editProfileValue, setEditProfileValue] = useState({
    avatar: null,
    avatarName: "",
    avatarPreview: userProfileData.avatar,
    nickname: userProfileData.nickname,
  });

  useEffect(() => {
    dispatch(__getCurrentUser());
  }, []);

  useEffect(() => {
    setEditProfileValue({
      avatar: null,
      avatarName: "",
      avatarPreview: userProfileData.avatar,
      nickname: userProfileData.nickname,
    });
    setProfileEditMode(false);
  }, [userProfileData]);

  const toggleEditModeHandler = () => {
    setEditProfileValue({
      avatar: null,
      avatarName: "",
      avatarPreview: userProfileData.avatar,
      nickname: userProfileData.nickname,
    });
    setProfileEditMode((prev) => (prev ? false : true));
  };

  const userNicknameChangeHandler = (e) => {
    setEditProfileValue((prev) => {
      return { ...prev, nickname: e.target.value };
    });
  };

  const userAvatarImageChangeHandler = (e) => {
    setEditProfileValue((prev) => {
      return {
        ...prev,
        avatarName: e.target.value,
        avatar: e.target.files[0] ? e.target.files[0] : null,
        avatarPreview: e.target.files[0]
          ? URL.createObjectURL(e.target.files[0])
          : userProfileData.avatar,
      };
    });
  };

  const updateProfileHandler = () => {
    if (
      editProfileValue.nickname === userProfileData.nickname &&
      !editProfileValue.avatar
    ) {
      toast.error("변경된 사항이 없습니다.");
      return;
    }

    const formData = new FormData();
    if (editProfileValue.avatar)
      formData.append("avatar", editProfileValue.avatar);

    formData.append("nickname", editProfileValue.nickname);

    dispatch(__updateProfile({ formData, userId: userProfileData.userId }));
  };

  return (
    <StProfileContainerDiv>
      <h1> 프로필 관리</h1>
      <StAvatarImageFigure>
        <img src={editProfileValue.avatarPreview} />
        {profileEditMode ? (
          <label htmlFor="avatarImage">파일 선택</label>
        ) : null}
        <input
          id="avatarImage"
          onChange={userAvatarImageChangeHandler}
          type="file"
          accept="image/jpeg,image/jpg"
          style={{ display: "none" }}
          files={editProfileValue.avatar}
          value={editProfileValue.avatarName || ""}
        />
      </StAvatarImageFigure>

      {profileEditMode ? (
        <StNicknameInput
          value={editProfileValue.nickname}
          onChange={userNicknameChangeHandler}
        />
      ) : (
        <h2>{editProfileValue.nickname}</h2>
      )}

      <span>{userProfileData.userId}</span>

      <div>
        {profileEditMode ? (
          <>
            <button onClick={updateProfileHandler}>수정완료</button>
            <button onClick={toggleEditModeHandler}>취소하기</button>
          </>
        ) : (
          <button onClick={toggleEditModeHandler}>수정하기</button>
        )}
      </div>
    </StProfileContainerDiv>
  );
};

const StProfileContainerDiv = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  width: 60%;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  margin: auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h1 {
    margin-bottom: 3rem;
    font-size: 3rem;
    font-weight: bold;
  }
  & h2 {
    font-size: 2rem;
    font-weight: bold;
  }
  & span {
    font-size: 1.5rem;
    color: #474747;
    margin: 1rem 0 3rem 0;
  }
  & button {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

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

const StNicknameInput = styled.input`
  font-size: 2rem;
  text-align: center;
  font-family: inherit;
  padding: 0;
  background: none;
  border: none;
  outline: none;
  border-bottom: 2px solid black;
`;
export default Profile;
