import React, { useEffect, useState } from "react";
import styles from "./RequestForQuote.module.scss";
import { getDatas } from "../../api/firebase";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

function RequestForQuote() {
  // user 상태를 선언합니다.
  const [user, setUser] = useState(null);
  const [date, setDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [farmAddress, setFarmAddress] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    const idExtraction = async () => {
      // localStorage에 있는 사용자의 정보를 추출합니다.
      const userStr = localStorage.getItem("user");

      // "user" 키에 데이터가 저장되어 있지 않은 경우
      if (!userStr) {
        console.log("로그인이 되어있지 않습니다.");
        return;
      }

      // JSON 문자열을 객체로 변환
      try {
        const parsedUser = JSON.parse(userStr);
        if (parsedUser.email) {
          setUser(parsedUser);

          // email이 있으면 infoExtraction 호출
          await infoExtraction(parsedUser.email);
          // farmAddressExtraction(parsedUser);
        } else {
          console.error("Email not found in user object");
        }
      } catch (error) {
        console.error("JSON parsing error:", error);
      }
    };

    const infoExtraction = async (email) => {
      try {
        // Firebase database에서 문서 목록을 가져옵니다.
        const snapshots = await getDatas("users");

        // email과 일치하는 문서 객체 찾기
        const matchingDoc = snapshots.find((doc) => doc.email === email);

        if (matchingDoc) {
          // 일치하는 문서를 상태에 설정하고 콘솔에 출력
          setUserEmail(matchingDoc.email);
          setFarmAddress(matchingDoc.farmAddress);
          console.log(
            "Matching Document:",
            matchingDoc.email,
            matchingDoc.farmAddress
          );
        } else {
          console.error("No document found with email:", email);
        }
      } catch (error) {
        console.error("Firebase database error:", error);
      }
    };

    idExtraction();
  }, []);

  const handlePayment = () => {
    console.log("결제정보가 데이터베이스에 저장되었습니다.");
  };

  return (
    <Container>
      {/* 견적을 요청하고 사용자의 정보를 입력하면 결제 페이지로 넘어갑니다. &nbsp;
      실제로 결제를 구현하지 않고 사용자의 결제 정보만 저장합니다. &nbsp; 사용자
      결제 저장할 때 정보 &nbsp; 1. 회원 컬렉션에서 order 컬렉션을 만듭니다.
      &nbsp; 2. order에는 견적 요청에서 입력한 값들을 필드로 만들어 저장합니다.
      &nbsp; (견적요청아이디, 결제날짜, 요청날짜, 농장주소 등) &nbsp; 3.
      마이페이지에는 order의 정보가 출력됩니다. &nbsp; 4. 로그인된 사용자는
      사용자가 회원가입 시 사용한 내용을 출력해 다시 입력하지 않습니다. &nbsp;
      5. 비회원은 견적요청 아이디만 알려주고 마이페이지에서 조회할 때 사용(요청
      아이디를 꼭 알고 있어야 됨) */}
      <form>
        <div className={styles.id}>
          {/* 회원의 경우 아이디(이메일)와 농장 주소는 readOnly 처리 되어있음. */}
          <h3>견적 의뢰 아이디</h3>
          {user && user.isAuthenticated ? (
            <input type="text" value={userEmail} readOnly />
          ) : (
            <input type="text" placeholder="이메일을 입력해주세요." />
          )}
        </div>
        <div className={styles.paymentDate}>
          <h3>결제 날짜</h3>
          <input type="date" value={date} readOnly />
        </div>
        <div className={styles.requestDate}>
          <h3>요청 날짜</h3>
          <input type="date" value={date} readOnly />
        </div>
        <div className={styles.farmAddress}>
          <h3>농장 주소</h3>
          {user && user.isAuthenticated ? (
            <input type="text" value={farmAddress} readOnly />
          ) : (
            <input type="text" placeholder="농장 주소를 입력해주세요." />
          )}
        </div>
        <Link to="../myPayment">
          <button className={styles.submit} onClick={handlePayment}>
            결제하기
          </button>
        </Link>
      </form>
    </Container>
  );
}

export default RequestForQuote;
