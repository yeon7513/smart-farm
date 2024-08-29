import React, { useEffect, useState } from "react";
import styles from "./RequestForQuote.module.scss";
import { getDatas } from "../../api/firebase";
import { Container } from "@mui/material";
import FacilitiesHorticulture from "./FacilitiesHorticulture";
import OpenGround from "./OpenGround";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

function RequestForQuote() {
  // user 상태를 선언합니다.
  const [user, setUser] = useState(null);
  const [date, setDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [facilityType, setFacilityType] = useState("시설원예");
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);

    //   // localStorage에 있는 사용자의 정보를 추출합니다.
    const idExtraction = async () => {
      try {
        const userStr = JSON.parse(localStorage.getItem("user"));
        if (userStr) {
          setUser(userStr);
          await infoExtraction(userStr.uid);
        } else {
          console.log("로그인이 되어있지 않습니다.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Firebase에서 uid와 일치하는 문서 객체 찾기
    const infoExtraction = async (uid) => {
      try {
        // Firebase에서 사용자 데이터를 가져옵니다.
        const snapshots = await getDatas("users");

        // uid와 일치하는 문서 객체를 찾습니다.
        const matchingDoc = snapshots.find((doc) => doc.docId === uid);

        if (matchingDoc) {
          setUserEmail(matchingDoc.email || "");
          setFarmAddress(matchingDoc.farmAddress || "");
        } else {
          console.error("No document found with UID:", uid);
        }
      } catch (error) {
        console.error("Error extracting information:", error);
      }
    };
    idExtraction();
  }, []);

  const handleFacilityTypeChange = (e) => {
    setFacilityType(e.target.value);
    setAdditionalOptions([]);
    // console.log(e.target.value);
  };

  const handleAdditionalOptionsChange = (e) => {
    const value = e.target.value;
    setAdditionalOptions((prevOptions) =>
      prevOptions.includes(value)
        ? prevOptions.filter((option) => option !== value)
        : [...prevOptions, value]
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({
    //   userEmail,
    //   date,
    //   farmAddress,
    //   facilityType,
    //   additionalOptions,
    // });
    console.log(
      `견적 의뢰 아이디: `,
      userEmail,
      `결제 날짜: `,
      date,
      `농장 주소: `,
      farmAddress,
      `농장 종류: `,
      facilityType,
      `부가 옵션: `,
      additionalOptions
    );
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
        <div>
          <h3>견적 정보</h3>
        </div>
        <div className={styles.id}>
          {/* 회원의 경우 아이디(이메일)와 농장 주소는 readOnly 처리 되어있음.
          비회원의 경우 아이디(이메일)와 농장 주소를 입력 가능함. */}
          <h3>견적 의뢰 아이디</h3>
          {user ? (
            <input type="text" value={userEmail} readOnly />
          ) : (
            <input
              type="text"
              placeholder={"이메일을 입력해주세요."}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          )}
        </div>
        <div className={styles.paymentDate}>
          <h3>결제 날짜</h3>
          <input type="date" value={date || ""} readOnly />
        </div>
        <div className={styles.requestDate}>
          <h3>요청 날짜</h3>
          <input type="date" value={date || ""} readOnly />
        </div>
        <div className={styles.farmAddress}>
          <h3>농장 주소</h3>
          {user ? (
            <input type="text" value={farmAddress} readOnly />
          ) : (
            <input
              type="text"
              placeholder={"농장 주소를 입력해주세요."}
              onChange={(e) => setFarmAddress(e.target.value)}
            />
          )}
        </div>
        <div>
          <h3>시설원예 혹은 노지 선택</h3>
          <select value={facilityType} onChange={handleFacilityTypeChange}>
            <option value="시설원예">시설원예</option>
            <option value="노지">노지</option>
          </select>
        </div>
        <div>
          <h3>부가 옵션 선택</h3>
          {facilityType === "시설원예" ? (
            <FacilitiesHorticulture
              additionalOptions={additionalOptions}
              handleAdditionalOptionsChange={handleAdditionalOptionsChange}
            />
          ) : (
            <OpenGround
              additionalOptions={additionalOptions}
              handleAdditionalOptionsChange={handleAdditionalOptionsChange}
            />
          )}
        </div>
        <Checkout description={"결제하기"} onClick={handleSubmit} />
      </form>
    </Container>
  );
}

export default RequestForQuote;
