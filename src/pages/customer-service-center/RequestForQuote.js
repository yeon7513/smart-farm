import React, { useEffect, useState } from "react";
import styles from "./RequestForQuote.module.scss";
import { getDatas } from "../../api/firebase";

function RequestForQuote() {
  // user 상태를 선언합니다.
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [farmAddress, setFarmAddress] = useState("");

  useEffect(() => {
    const emailExtraction = async () => {
      // localStorage에 있는 사용자의 정보를 추출합니다.
      const userStr = localStorage.getItem("user");

      // "user" 키에 데이터가 저장되어 있지 않은 경우
      if (!userStr) {
        console.error("No user information found in localStoarge.");
        return;
      }

      // JSON 문자열을 객체로 변환
      try {
        const parsedUser = JSON.parse(userStr);
        if (parsedUser && parsedUser.isAuthenticated) {
          setUser(parsedUser);
          farmAddressExtraction(parsedUser);
        } else {
          console.error("Email not found in user object");
        }
      } catch (error) {
        console.error("JSON parsing error:", error);
      }
    };
    emailExtraction();
  }, []);

  const farmAddressExtraction = async (userUid) => {
    try {
      const snapshot = await getDatas("users");
      const userDoc = snapshot.docs.find((doc) => {
        const data = doc.data();
        return data.uid === userUid;
      });

      if (userDoc) {
        const data = userDoc.data();
        setUserEmail(data.email || "");
        setFarmAddress(data.farmAddress || "");
      } else {
        console.error("No matching user found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
    }
  };

  return (
    <div>
      {/* 견적을 요청하고 사용자의 정보를 입력하면 결제 페이지로 넘어갑니다. &nbsp;
      실제로 결제를 구현하지 않고 사용자의 결제 정보만 저장합니다. &nbsp; 사용자
      결제 저장할 때 정보 &nbsp; 1. 회원 컬렉션에서 order 컬렉션을 만듭니다.
      &nbsp; 2. order에는 견적 요청에서 입력한 값들을 필드로 만들어 저장합니다.
      &nbsp; (견적요청아이디, 결제날짜, 요청날짜, 농장주소 등) &nbsp; 3.
      마이페이지에는 order의 정보가 출력됩니다. &nbsp; 4. 로그인된 사용자는
      사용자가 회원가입 시 사용한 내용을 출력해 다시 입력하지 않습니다. &nbsp;
      5. 비회원은 견적요청 아이디만 알려주고 마이페이지에서 조회할 때 사용(요청
      아이디를 꼭 알고 있어야 됨) */}
      {/* <form> */}
      <div className={styles.id}>
        {/* 회원의 경우 input창은 disabled 처리가 되어있음. */}
        <h3>견적 의뢰 아이디</h3>
        {user && user.isAuthenticated ? (
          <input type="text" value={user.email} readOnly />
        ) : (
          <input type="text" placeholder="이메일을 입력해주세요." />
        )}
      </div>
      <div className={styles.paymentDate}>
        <h3>결제 날짜</h3>
        <input type="date" />
      </div>
      <div className={styles.requestDate}>
        <h3>요청 날짜</h3>
        <input type="date" />
      </div>
      <div className={styles.farmAddress}>
        <h3>농장 주소</h3>
        {user && user.isAuthenticated ? (
          <input type="text" value={farmAddress} />
        ) : (
          <input type="text" placeholder="농장 주소를 입력해주세요." />
        )}
      </div>
      <button className={styles.submit}>결제하기</button>
      {/* </form> */}
    </div>
  );
}

export default RequestForQuote;
