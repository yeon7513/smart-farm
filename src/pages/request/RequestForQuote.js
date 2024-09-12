import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/layout/container/Container";
import RequestForm from "./request-form/RequestForm";
import styles from "./RequestForQuote.module.scss";
import * as XLSX from "xlsx/xlsx.mjs";

function RequestForQuote() {
  // 유저 정보 불러오기
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 결제정보 저장 state
  const [requestData, setRequestData] = useState([]);
  const [accumulatedData, setAccumulatedData] = useState([]);

  // 모아진 견적들을 한 엑셀 파일에 모아서 다운로드 받기 위한 함수입니다.
  const downloadExcel = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;

    const ws = XLSX.utils.json_to_sheet(accumulatedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "견적서");
    XLSX.writeFile(wb, `${createdAt}.xlsx`);
  };

  return (
    <Container className={styles.container}>
      <h2>견적 의뢰</h2>
      {/* 견적을 요청하고 사용자의 정보를 입력하면 결제 페이지로 넘어갑니다. &nbsp;
      실제로 결제를 구현하지 않고 사용자의 결제 정보만 저장합니다. &nbsp; 사용자
      결제 저장할 때 정보 &nbsp; 1. 회원 컬렉션에서 payments 컬렉션을 만듭니다.
      &nbsp; 2. payments에는 견적 요청에서 입력한 값들을 필드로 만들어 저장합니다.
      &nbsp; (견적요청아이디, 결제날짜, 요청날짜, 농장주소 등) &nbsp; 3.
      마이페이지에는 payments의 정보가 출력됩니다. &nbsp; 4. 로그인된 사용자는
      사용자가 회원가입 시 사용한 내용을 출력해 다시 입력하지 않습니다. &nbsp;
      5. 비회원은 견적요청 아이디만 알려주고 마이페이지에서 조회할 때 사용(요청
      아이디를 꼭 알고 있어야 됨) */}
      <RequestForm user={user} onSubmit={(data) => setRequestData(data)} />
      {/* Form을 추가할 수 있음 (Redux로 관리하기??) */}
    </Container>
  );
}

export default RequestForQuote;
