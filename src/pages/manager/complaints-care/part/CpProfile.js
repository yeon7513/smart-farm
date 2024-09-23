import React, { useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import ex from "../../../../assets/main/logo2.png";
import CustomModal from "../../../../components/modal/CustomModal";
import FileInput from "../../../../components/form/file-input/FileInput";
import CpModal from "./CpModal";

function CpProfile({ item }) {
  const [values, setValues] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goProcessed = () => {
    setIsModalOpen(false);
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.profile}>
          <img src={item.profileUrl} alt="" />
          <h3>{item.defendant}</h3>
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
              <form onSubmit={handleSubmit}>
                {/* <span>[FM{createdAt}]</span> */}
                <FileInput
                  setFile={handleChange}
                  name="photoUrl"
                  // value={photoUrl}
                  // initialPreview={photoUrl}
                />
                <ul>
                  <li>
                    <span>닉네임: {item.defendant} </span>
                    <input
                      type="text"
                      name="nickname"
                      value={item.defendant}
                      onChange={handleInputChange}
                    />
                  </li>
                </ul>
                <div className={styles.btns}>
                  <button type="submit" onClick={handleSubmit}>
                    수정완료
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
