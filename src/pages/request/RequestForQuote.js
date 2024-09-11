import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../components/layout/container/Container";
import RequestForm from "./request-form/RequestForm";
import styles from "./RequestForQuote.module.scss";
import * as XLSX from "xlsx/xlsx.mjs";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../api/firebase";

function RequestForQuote() {
  // 유저 정보 불러오기
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // 결제정보 저장 state
  const [requestData, setRequestData] = useState([]);
  const [accumulatedData, setAccumulatedData] = useState([]);
  const [uid, setUid] = useState(user?.uid || "");

  useEffect(() => {
    console.log("Request Data has changed:", requestData);
  }, [requestData]);

  // 취소용
  const navigate = useNavigate();

  // 결제 버튼 (임시로 콘솔에 결제정보가 나오는지 해놨어요.)
  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;

    // const data = {
    //   아이디: user.email,
    //   이름: user.name,
    //   주소: user.address,
    //   연락처: user.number,
    //   "작물 종류": requestData.cropType,
    //   "농업 종류": requestData.option,
    //   "부가 옵션": requestData.additionalOptions
    //     ? Object.keys(requestData.additionalOptions)
    //         .filter((key) => requestData.additionalOptions[key])
    //         .join(", ")
    //     : "없음",
    //   "농장 주소": requestData.farmAddress,
    //   "농장 면적": requestData.farmArea,
    //   "농장 동 수": requestData.farmEquivalent,
    //   "주문 번호": createdAt,
    // };

    if (!requestData || Object.keys(requestData).length === 0) {
      console.error("견적 정보가 없습니다.");
      return;
    }

    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        const paymentCollectionRef = collection(userDocRef, "payments");
        await addDoc(paymentCollectionRef, requestData);
        console.log("데이터가 성공적으로 추가되었습니다.");

        // 데이터를 업데이트 합니다.
        setAccumulatedData((prevData) => [...prevData, requestData]);

        // 데이터를 추가하고 초기화합니다.
        setRequestData([]);
      } else {
        console.error("사용자 ID가 설정되지 않았습니다.");
      }
    } catch (error) {
      console.error("에러가 발생하였습니다: ", error);
    }
  };

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
      <RequestForm user={user} onSubmit={setRequestData} />
      {/* Form을 추가할 수 있음 (Redux로 관리하기??) */}
      <div className={styles.btns}>
        <button className={styles.submit} onClick={handleSubmitRequest}>
          결제
        </button>
        <button className={styles.cancel} onClick={() => navigate(-1)}>
          취소
        </button>
        <button className={styles.cancel} onClick={downloadExcel}>
          다운로드(단, 관리자만 가능)
        </button>
      </div>
    </Container>
  );
}

export default RequestForQuote;
