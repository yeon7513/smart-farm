import React, { useEffect, useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import ex from "../../../../assets/main/logo2.png";
import CustomModal from "../../../../components/modal/CustomModal";
import FileInput from "../../../../components/form/file-input/FileInput";
import CpModal from "./CpModal";
import TextInput from "../../../../components/form/text-input/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, updateUserInfo } from "../../../../store/user/UserSlice";
// import { useComponentContext } from "../../../../context/ComponentContext";
import placehorderImg from "../../../../assets/member/basic_profile.png";

function CpProfile({ item }) {
  // console.log(item.userDocId);
  const dispatch = useDispatch();
  // const { setCurrComp } = useComponentContext();
  const { items, isLoading } = useSelector((state) => state.userSlice);

  const [values, setValues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [checkNickName, setCheckNickName] = useState(false);

  const goProcessed = () => {
    setIsModalOpen(false);
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // 닉네임 중복 확인
  const handleNickNameCheckDuplication = (e) => {
    const { name, value } = e.target;

    const nickNameCheck = items.some((item) => item.nickname === value);

    if (value !== "" && !nickNameCheck) {
      // 중복이 없을 경우
      setCheckNickName(false);
      handleChange(name, value);
    } else if (value === "" || nickNameCheck) {
      // 중복이 있을 경우
      setCheckNickName(true);
      handleChange(name, value);
    }
  };

  // 파이어베이스 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateNickname = checkNickName ? values.nickname : item.defendant;

    const params = {
      collectionName: "users",
      docId: item?.userDocId,
      updateObj: {
        ...values,
        nickname: updateNickname,
      },
      photoUrl: values.photoUrl || placehorderImg, // 기본 이미지로 설정
    };

    try {
      await dispatch(updateUserInfo(params)); // 비동기 처리
      // setIsModalOpen(false); // 성공 시 모달 닫기
    } catch (error) {
      console.error("신고 프로필 수정 중 오류 : ", error);
    }
  };

  useEffect(() => {
    if (item) {
      setValues({
        nickname: item.defendant,
        photoUrl: item.photoUrl || placehorderImg,
      });
    }
  }, [item]);

  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.profile}>
          <img src={values?.photoUrl || item.photoUrl} alt="" />
          <h3>{values?.nickname || item.defendant}</h3>
        </div>
        <div className={styles.care}>
          <p>신고사유: {item.reasonName}</p>
          <p>신고자: {item.complainant} </p>
          <div>
            <button onClick={openModal}>승인</button>
            <CustomModal
              title={"댓글 신고 승인"}
              btnName={"승인"}
              handleClose={closeModal}
              isOpen={isModalOpen}
              btnHandler={goProcessed}
            >
              <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                  <FileInput
                    setFile={handleChange}
                    name="photoUrl"
                    value={values?.photoUrl || item.photoUrl}
                    initialPreview={item.photoUrl}
                    className={styles.modalImg}
                  />
                </div>
                <div className={styles.nickname}>
                  <TextInput
                    type="text"
                    name="nickname"
                    value={values?.nickname || item.defendant}
                    placeholder={item.defendant}
                    onChange={handleNickNameCheckDuplication}
                  />
                  <p>신고 누적 횟수: 3회</p>
                </div>
                <div className={styles.btns}>
                  <button type="submit" onClick={handleSubmit}>
                    수정 완료
                  </button>
                  <button type="button">활동 정지</button>
                </div>
              </form>
            </CustomModal>

            <CpModal />
          </div>
        </div>
      </div>
    </>
  );
}

export default CpProfile;
