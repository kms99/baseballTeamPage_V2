import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { __getCurrentUser, __updateProfile } from "../redux/modules/authSlice";
import ProfileAvatarArea from "../components/Profile/ProfileAvatarArea";
import Button from "../components/common/Button";
import { openModal } from "../redux/modules/modalSlice";

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

  const cancelEditMode = () => {
    dispatch(
      openModal({
        message: "변경작업을 취소 하시겠습니까",
        onConfirm: toggleEditModeHandler,
      })
    );
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

  const upDateProfileEvent = () => {
    const formData = new FormData();
    if (editProfileValue.avatar)
      formData.append("avatar", editProfileValue.avatar);

    formData.append("nickname", editProfileValue.nickname);

    dispatch(__updateProfile({ formData, userId: userProfileData.userId }));
  };

  const updateProfileClickHandler = () => {
    if (
      editProfileValue.nickname === userProfileData.nickname &&
      !editProfileValue.avatar
    ) {
      toast.error("변경된 사항이 없습니다.");
      return;
    }

    dispatch(
      openModal({
        message: "정말 수정하시겠습니까",
        onConfirm: upDateProfileEvent,
      })
    );
  };

  const PROFILE_EDIT_BUTTON = [
    { text: "수정완료", handler: updateProfileClickHandler, mode: true },
    { text: "취소하기", handler: cancelEditMode, mode: true },
    { text: "수정하기", handler: toggleEditModeHandler, mode: false },
  ];

  return (
    <StProfileContainerDiv>
      <h1> 프로필 관리</h1>
      <ProfileAvatarArea
        editProfileValue={editProfileValue}
        userAvatarImageChangeHandler={userAvatarImageChangeHandler}
        profileEditMode={profileEditMode}
      />
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
        {PROFILE_EDIT_BUTTON.filter(
          (buttonInfo) => buttonInfo.mode === profileEditMode
        ).map((button) => (
          <Button
            key={button.text}
            text={button.text}
            handler={button.handler}
            style={{
              color: "#000000",
              hoverColor: "#FFFFFF",
              fontSize: "2rem",
            }}
          />
        ))}
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
