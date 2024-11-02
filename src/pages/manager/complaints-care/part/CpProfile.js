import React, { useEffect, useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import CustomModal from "../../../../components/modal/CustomModal";
import FileInput from "../../../../components/form/file-input/FileInput";
import CpSanction from "./CpSanction";
import TextInput from "../../../../components/form/text-input/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../../../store/user/UserSlice";
import {
  approveComplaint,
  approveSuspend,
} from "../../../../store/complain/complainSlice";
import { changingNickName } from "../../../../utils/transformNick";

function CpProfile({ item, process }) {
  const processYy = {
    y: "거부",
    Y: "승인",
  };

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 승인
  const goProcessed = () => {
    dispatch(
      approveComplaint({ userId: item.defendantDocId, complainId: item.docId })
    )
      .then(() => {
        alert("신고가 승인되었습니다.");
        setIsModalOpen(false); // 모달 닫기
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  };

  // 활동 정지
  const goSuspend = () => {
    dispatch(approveSuspend({ userId: item.defendantDocId }))
      .then(() => {
        alert("해당 유저를 활동 정지 처리하였습니다.");
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  };

  const { items, isLoading } = useSelector((state) => state.userSlice);

  const member = items.find((user) => user.docId === item.defendantDocId);

  const [values, setValues] = useState({
    nickname: member.nickname,
    photoUrl: member.photoUrl,
  });
  const [newNickName, setNewNickName] = useState(member.nickname);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomNickName = () => {
    const newRandomNickName = changingNickName();
    setNewNickName(newRandomNickName);
    handleChange("nickname", newRandomNickName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      collectionName: "users",
      docId: item.defendantDocId,
      updateObj: values,
      photoUrl: member.photoUrl,
    };

    try {
      dispatch(updateUserInfo(params));

      if (isLoading === false) {
        await setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.profile}>
          <img src={values?.photoUrl || item.photoUrl} alt="" />
          <h3>{values?.nickname || item.defendant}</h3>
        </div>
        <div className={styles.care}>
          <div className={styles.careUser}>
            <p>신고사유: {item.reasonName}</p>
            <p>신고자: {item.complainant} </p>
          </div>
          <div>
            {process === "processing" ? (
              <>
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
                        className={styles.modalImg}
                        setFile={handleChange}
                        name="photoUrl"
                        value={values.photoUrl}
                        initialPreview={member.photoUrl}
                        selected={true}
                      />
                    </div>
                    <div className={styles.nickname}>
                      <TextInput
                        type="text"
                        name="nickname"
                        value={newNickName}
                        placeholder={item.defendant}
                        isDisabled={true}
                      />
                      <button type="button" onClick={handleRandomNickName}>
                        변경
                      </button>
                    </div>
                    <div className={styles.processBtn}>
                      <button type="submit">수정 완료</button>
                      <button type="button" onClick={goSuspend}>
                        활동 정지
                      </button>
                    </div>
                  </form>
                </CustomModal>

                <CpSanction
                  complainant={item.complainantDocId}
                  complainId={item.docId}
                />
              </>
            ) : (
              <div className={styles.processed}>
                <p>처리일: {item.processedAt}</p>
                <p>처리 결과: {processYy[item.processYn]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CpProfile;
