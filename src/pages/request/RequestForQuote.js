import React, { useEffect, useState } from "react";
import styles from "./RequestForQuote.module.scss";
import { db, getDatas } from "../../api/firebase";
import { Container } from "@mui/material";
import FacilitiesHorticulture from "./FacilitiesHorticulture";
import OpenGround from "./OpenGround";
import Checkout from "./Checkout";
import * as XLSX from "xlsx/xlsx.mjs";
import { addDoc, collection, doc } from "firebase/firestore";

function RequestForQuote() {
  // user 상태를 선언합니다.
  const [user, setUser] = useState(null);
  const [date, setDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [facilityType, setFacilityType] = useState("시설원예");
  const [farmName, setFarmName] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [farmEquivalent, setFarmEquivalent] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [uid, setUid] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    //   // localStorage에 있는 사용자의 정보를 추출합니다.
    const idExtraction = async () => {
      try {
        const userStr = JSON.parse(localStorage.getItem("user"));
        if (userStr) {
          setUser(userStr);
          setUid(userStr.uid);
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
    setAdditionalOptions({});
  };

  const handleAdditionalOptionsChange = (e) => {
    const value = e.target.value;
    setAdditionalOptions((prevOptions) => {
      // 옵션이 이미 존재하는 경우 제거하고, 그렇지 않으면 추가합니다.
      const updatedOptions = { ...prevOptions };
      if (updatedOptions[value]) {
        delete updatedOptions[value];
      } else {
        updatedOptions[value] = true; // 값을 true로 설정하거나 필요한 값을 설정합니다.
      }
      return updatedOptions;
    });
  };

  const handleFarmNameChange = (e) => {
    setFarmName(e.target.value || "");
  };

  const handleFarmAreaChange = (e) => {
    setFarmArea(Number(e.target.value) || "");
  };

  const handleFarmEquivalentChange = (e) => {
    setFarmEquivalent(Number(e.target.value) || "");
  };

  // 견적 의뢰 내용을 Firebase에 저장하는 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");
    console.log(
      `견적 의뢰 아이디:`,
      userEmail,
      `, 결제 날짜:`,
      date,
      `, 농장 주소:`,
      farmAddress,
      `, 농장 종류:`,
      facilityType,
      `, 농장 이름:`,
      farmName,
      `, 부가 옵션:`,
      additionalOptions,
      `, 농장 면적:`,
      farmArea,
      `㎡`,
      `, 농장 동 수:`,
      farmEquivalent
    );
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;
    const dataObj = {
      userEmail,
      date,
      farmAddress,
      facilityType,
      additionalOptions,
      farmName,
      farmArea,
      farmEquivalent,
      // createdAt는 1724893344632 같은 number 형식이라서 주문번호로 쓸 예정
      createdAt,
    };

    if (userEmail.length < 4) {
      console.log("아이디를 입력하여 주시기 바랍니다. (최소 4자)");
      return false;
    }

    if (farmAddress.length < 1) {
      console.log("농장 주소를 입력하여 주시기 바랍니다.");
      return false;
    }

    if (farmName.length <= 0) {
      console.log("농장 이름을 입력하여 주시기 바랍니다.");
      return false;
    }

    if (farmArea <= 0) {
      console.log("유효한 농장 면적 값이 아닙니다.");
      return false;
    }

    if (farmEquivalent <= 0) {
      console.log("농장 동 수는 최소 1동 이상이어야 합니다.");
      return false;
    }

    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        const paymentCollectionRef = collection(userDocRef, "payments");
        await addDoc(paymentCollectionRef, dataObj);
        console.log("데이터가 성공적으로 추가되었습니다.");
        // handleExcelDownload(e);
      } else {
        console.error("사용자 ID가 설정되지 않았습니다.");
      }
    } catch (error) {
      console.error("에러가 발생하였습니다: ", error);
    }
  };

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 주문 내역에 따라 Excel 파일을 다운로드 하는 함수입니다.
  const handleExcelDownload = (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = formatDateToYYYYMMDD(today);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;
    // console.log("Additional Options: ", additionalOptions);
    const fileName = `${userEmail}님의 견적 주문번호_${createdAt}`;

    // 배열로 되어있는 부가 옵션을 객체로 변환
    const additionalOptionsEntries = Object.entries(additionalOptions).map(
      ([key, value], index) => ({
        [`Option ${index + 1}`]: value,
        key,
      })
    );
    console.log(additionalOptionsEntries);

    // 객체 생성
    const data = [
      {
        아이디: userEmail,
        날짜: formattedDate,
        "농장 주소": farmAddress,
        "농장 종류": facilityType,
        "부가 옵션": additionalOptionsEntries.reduce(
          (acc, obj) => ({ ...acc, ...obj }),
          {}
        ),
        "농장 이름": farmName,
        "농장 면적": `${Number(farmArea)}㎡`,
        "농장 동 수": Number(farmEquivalent),
        "주문 번호": createdAt,
      },
    ];
    const datas = data?.length ? data : [];
    const worksheet = XLSX.utils.json_to_sheet(datas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
  };

  return (
    <Container>
      {/* 견적을 요청하고 사용자의 정보를 입력하면 결제 페이지로 넘어갑니다. &nbsp;
      실제로 결제를 구현하지 않고 사용자의 결제 정보만 저장합니다. &nbsp; 사용자
      결제 저장할 때 정보 &nbsp; 1. 회원 컬렉션에서 payments 컬렉션을 만듭니다.
      &nbsp; 2. payments에는 견적 요청에서 입력한 값들을 필드로 만들어 저장합니다.
      &nbsp; (견적요청아이디, 결제날짜, 요청날짜, 농장주소 등) &nbsp; 3.
      마이페이지에는 payments의 정보가 출력됩니다. &nbsp; 4. 로그인된 사용자는
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
          <input type="date" value={date} readOnly />
        </div>
        <div className={styles.requestDate}>
          <h3>요청 날짜</h3>
          <input type="date" value={date} readOnly />
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
        <div className={styles.farmName}>
          <h3>농장 이름</h3>
          <input
            type="text"
            placeholder={"농장 이름을 입력해주세요."}
            onChange={handleFarmNameChange}
          />
        </div>
        <div>
          <h3>시설원예 혹은 노지 선택</h3>
          <select value={facilityType} onChange={handleFacilityTypeChange}>
            <option value="시설원예">시설원예</option>
            <option value="노지">노지</option>
          </select>
        </div>
        <div className={styles.farmArea}>
          <h3>농장 면적</h3>
          <input
            type="number"
            placeholder="농장 면적은 최소 1㎡ 이상."
            value={farmArea}
            onChange={handleFarmAreaChange}
            min="1"
          />{" "}
          ㎡
        </div>
        <div className={styles.farmEquivalent}>
          <h3>농장 동 수</h3>
          <select
            type="number"
            value={farmEquivalent}
            onChange={handleFarmEquivalentChange}
          >
            <option value="0">값을 선택하여 주시기 바랍니다.</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          동
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
        <Checkout
          type="submit"
          description={"결제하기"}
          onClick={(e) => {
            e.preventDefault();
            handleExcelDownload(e);
            handleSubmit(e);
          }}
        />
      </form>
    </Container>
  );
}

export default RequestForQuote;
