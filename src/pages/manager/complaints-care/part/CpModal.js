import React, { useState } from "react";
import CustomModal from "../../../../components/modal/CustomModal";

function CpModal() {
  const [noModalOpen, setNoModalOpen] = useState(false);
  const openNoModal = () => setNoModalOpen(true);
  const closeNoModal = () => setNoModalOpen(false);

  const noProcessed = () => {
    setNoModalOpen(false);
  };

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
          <p>신고자 플필 사진</p>
          <p>신고자 닉네임</p>
          <p>신고자에게 허위신고 제재를 내리시겠습니까?</p>
        </div>
      </CustomModal>
    </>
  );
}

export default CpModal;
