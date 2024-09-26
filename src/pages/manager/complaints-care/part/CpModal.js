import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../store/user/UserSlice";
import { approveComplaint } from "../../../../store/complain/complainSlice";
import styles from "./CpModal.module.scss";

function CpModal({ complainant, complainId }) {
  // const [values, setValues] = useState();
  const [noModalOpen, setNoModalOpen] = useState(false);
  const openNoModal = () => setNoModalOpen(true);
  const closeNoModal = () => setNoModalOpen(false);

  const noProcessed = () => {
    dispatch(approveComplaint({ userId: complainant, complainId: complainId }))
      .then(() => {
        alert("신고가 승인되었습니다.");
        setNoModalOpen(false); // 모달 닫기
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  };

  const dispatch = useDispatch();
  // // const {processing} = useSelector((state) => state.complainSlice);
  const { items } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, [dispatch]);

  const member = items.find((item) => item.docId === complainant);

  return (
    <>
      <button onClick={openNoModal}>거부</button>
      <CustomModal
        title={"댓글 신고 거부"}
        btnName={"제재"}
        handleClose={closeNoModal}
        isOpen={noModalOpen}
        btnHandler={noProcessed}
      >
        <div>
          <img src={member?.photoUrl} alt="" className={styles.memberImg}></img>
          <p>{member?.nickname}</p>
          <p>신고자에게 허위신고 제재를 내리시겠습니까?</p>
        </div>
      </CustomModal>
    </>
  );
}

export default CpModal;
