import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import CustomModal from "../modal/CustomModal";
import styles from "./SearchAddr.module.scss";

function SearchAddr({ getAddr, className }) {
  // getAddr : 주소를 사용할 함수

  const [isOpen, setIsOpen] = useState(false);
  const [firstAddr, setFirstAddr] = useState("");
  const [secondAddr, setSecondAddr] = useState("");
  const focusRef = useRef();

  // 주소 검색 팝업 열기
  const handleOpen = () => {
    setIsOpen(true);
  };

  // 주소 검색 팝업 닫기
  const handleClose = () => {
    setIsOpen(false);
  };

  // 상세 주소 값 받아오기
  const handleChange = (e) => {
    setSecondAddr(e.target.value);
  };

  // 주소 검색 후 실행되는 함수
  const handleComplete = (data) => {
    setFirstAddr(data.address);
    handleClose();
  };

  // 주소 검색 완료 후 상세 주소 입력 포커싱
  useEffect(() => {
    if (!isOpen && focusRef.current && firstAddr !== "") {
      focusRef.current.focus();
    }
  }, [isOpen, firstAddr]);

  useEffect(() => {
    const mergeAddr = firstAddr + " " + secondAddr;
    getAddr(() => mergeAddr);
  }, [firstAddr, getAddr, secondAddr]);

  return (
    <>
      <div className={cn(styles.container, className)}>
        <div className={styles.search}>
          {/* 주소 검색 */}
          <input
            className={styles.firstAddr}
            type="text"
            name="first"
            placeholder="주소를 검색해주세요."
            value={firstAddr}
            onClick={handleOpen}
            readOnly
          />
          {/* 주소 검색 버튼 */}
          <button type="button" onClick={handleOpen}>
            주소검색
          </button>
        </div>
        {/* 상세 주소 입력 */}
        <input
          className={styles.secondAddr}
          type="text"
          name="second"
          placeholder="상세 주소를 입력해주세요."
          value={secondAddr}
          ref={focusRef}
          onChange={handleChange}
        />
      </div>
      {/* 주소  모달 띄움 */}
      <CustomModal
        title={"주소 검색"}
        btnName={"확인"}
        isOpen={isOpen}
        handleClose={handleClose}
        className={styles.modal}
      >
        <div className={styles.searchAddr}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      </CustomModal>
    </>
  );
}

export default SearchAddr;
