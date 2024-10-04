import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../store/user/UserSlice";
import {
  approveComplainant,
  notApproveComplaint,
} from "../../../../store/complain/complainSlice";
import styles from "./CpSanction.module.scss";

function CpSanction({ complainant, complainId }) {
  const [noModalOpen, setNoModalOpen] = useState(false);
  const openNoModal = () => setNoModalOpen(true);
  const closeNoModal = () => setNoModalOpen(false);

  const noProcessed = () => {
    dispatch(notApproveComplaint({ complainId: complainId }))
      .then(() => {
        alert("처리 상태를 '거부'로 변경하였습니다.");
        setNoModalOpen(false); // 모달 닫기
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  };
  const handleSanction = () => {
    dispatch(approveComplainant({ userId: complainant }))
      .then(() => {
        alert("신고자에게 허위신고로 인한 제재를 하였습니다.");
        setNoModalOpen(false); // 모달 닫기
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  };

  const dispatch = useDispatch();
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
        btnName={"거부"}
        handleClose={closeNoModal}
        isOpen={noModalOpen}
        btnHandler={noProcessed}
      >
        <div className={styles.sanction}>
          <img src={member?.photoUrl} alt="" className={styles.memberImg}></img>
          <p>{member?.nickname}</p>
          <p>신고자에게 허위신고 제재를 내리시겠습니까?</p>
          <button onClick={handleSanction}>제재</button>
        </div>
      </CustomModal>
    </>
  );
}

export default CpSanction;
