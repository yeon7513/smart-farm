import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProcessing } from "../../../../store/complain/complainSlice";
import { getUserById } from "../../../../store/user/UserSlice";

function CpModal({ complainant }) {
  const [noModalOpen, setNoModalOpen] = useState(false);
  const openNoModal = () => setNoModalOpen(true);
  const closeNoModal = () => setNoModalOpen(false);

  const noProcessed = () => {
    setNoModalOpen(false);
  };

  // const dispatch = useDispatch();
  // // const {processing} = useSelector((state) => state.complainSlice);
  // const { items } = useSelector((state) => state.UserSlice);

  // useEffect(() => {
  //   dispatch(getUserById(complainant)); // complainantDocId로 사용자 정보 불러오기
  // }, [dispatch, complainant]);

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
          {/* <p>{items.photoUrl}</p>
          <p>{items.nickname}</p> */}
          <p>신고자에게 허위신고 제재를 내리시겠습니까?</p>
        </div>
      </CustomModal>
    </>
  );
}

export default CpModal;
