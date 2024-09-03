import React, { useEffect, useState } from "react";
import styles from "./RequestForQuoteForm.module.scss";
import OpenGround from "./OpenGround";
import FacilitiesHorticulture from "./FacilitiesHorticulture";
import Checkout from "./Checkout";
import * as XLSX from "xlsx/xlsx.mjs";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../api/firebase";

function RequestForQuoteForm({ addEstimate, user }) {
  const [date, setDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cropType, setCropType] = useState("딸기");
  const [farmAddress, setFarmAddress] = useState("");
  const [facilityType, setFacilityType] = useState("시설원예");
  const [farmName, setFarmName] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [farmEquivalent, setFarmEquivalent] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [uid, setUid] = useState(user?.uid || "");

  useEffect(() => {
    const today = new Date();
    setDate(today.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email || "");
      setFarmAddress(user.farmAddress || "");
      setUid(user.uid || "");
    }
  }, [user]);

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
        // updatedOptions[value] = true; // 값을 true로 설정하거나 필요한 값을 설정합니다.
        updatedOptions[value] = value; // 값을 true로 설정하거나 필요한 값을 설정합니다.
      }
      //   console.log(Object.keys(updatedOptions));
      console.log(updatedOptions);
      return updatedOptions;
    });
  };

  // 견적서.xlsx로 주문 내역들을 모읍니다.
  const exportToExcel = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;
    // const fileName = `${userEmail}님의 견적 주문번호_${createdAt}.xlsx`;

    // const additionalOptionsEntries = Object.entries(additionalOptions).map(
    //   ([key, value], index) => ({
    //     [`Option ${index + 1}`]: value,
    //     key,
    //   })
    // );

    const formattedAdditionalOptions =
      Object.keys(additionalOptions).join(", ");

    const data = [
      {
        아이디: userEmail,
        날짜: date,
        "작물 종류": cropType,
        "농장 주소": farmAddress,
        "농장 종류": facilityType,
        "부가 옵션": formattedAdditionalOptions,
        "농장 이름": farmName,
        "농장 면적": `${Number(farmArea)}평`,
        "농장 동 수": Number(farmEquivalent),
        "주문 번호": createdAt,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "견적서");
    XLSX.writeFile(wb, "견적서.xlsx");
  };

  // 견적 의뢰 내용을 Firebase에 저장하는 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, "0");
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;
    const formattedAdditionalOptions =
      Object.keys(additionalOptions).join(", ");
    console.log(
      `견적 의뢰 아이디:`,
      userEmail,
      `, 결제 날짜:`,
      date,
      `, 농장 주소:`,
      farmAddress,
      `, 작물 종류:`,
      cropType,
      `, 농장 종류:`,
      facilityType,
      `, 농장 이름:`,
      farmName,
      `, 부가 옵션:`,
      formattedAdditionalOptions,
      `, 농장 면적:`,
      farmArea,
      `평`,
      `, 농장 동 수:`,
      farmEquivalent,
      `동`
    );
    const dataObj = {
      userEmail,
      date,
      cropType,
      farmAddress,
      facilityType,
      additionalOptions: formattedAdditionalOptions,
      farmName,
      farmArea,
      farmEquivalent,
      // createdAt는 1724893344632 같은 number 형식이라서 주문번호로 쓸 예정
      createdAt,
    };

    if (
      userEmail.length < 4 ||
      farmAddress.length < 1 ||
      farmName.length <= 0 ||
      farmArea <= 0 ||
      farmEquivalent <= 0
    ) {
      console.log("입력된 정보가 유효하지 않습니다.");
      return false;
    }

    try {
      if (uid) {
        const userDocRef = doc(db, "users", uid);
        const paymentCollectionRef = collection(userDocRef, "payments");
        await addDoc(paymentCollectionRef, dataObj);
        console.log("데이터가 성공적으로 추가되었습니다.");
        addEstimate(dataObj);
        exportToExcel();
        // handleExcelDownload(e);
      } else {
        console.error("사용자 ID가 설정되지 않았습니다.");
      }
    } catch (error) {
      console.error("에러가 발생하였습니다: ", error);
    }
  };

  return (
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
            value={userEmail}
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
      <div className={styles.cropType}>
        <h3>작물 종류</h3>
        <select value={cropType} onChange={(e) => setCropType(e.target.value)}>
          <option value="딸기">딸기</option>
          <option value="블루베리">블루베리</option>
          <option value="파프리카">파프리카</option>
          <option value="토마토">토마토</option>
          <option value="참외">참외</option>
        </select>
      </div>
      <div className={styles.farmAddress}>
        <h3>농장 주소</h3>
        {user ? (
          <input type="text" value={farmAddress} readOnly />
        ) : (
          <input
            type="text"
            placeholder={"농장 주소를 입력해주세요."}
            value={farmAddress}
            onChange={(e) => setFarmAddress(e.target.value)}
          />
        )}
      </div>
      <div className={styles.farmName}>
        <h3>농장 이름</h3>
        <input
          type="text"
          placeholder={"농장 이름을 입력해주세요."}
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
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
          placeholder="농장 면적은 최소 1평 이상."
          value={farmArea}
          onChange={(e) => setFarmArea(Number(e.target.value) || "")}
          min="1"
        />{" "}
        평
      </div>
      <div className={styles.farmEquivalent}>
        <h3>농장 동 수</h3>
        <select
          value={farmEquivalent}
          onChange={(e) => setFarmEquivalent(Number(e.target.value) || "")}
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
      <Checkout type="submit" description={"결제하기"} onClick={handleSubmit} />
    </form>
  );
}

export default RequestForQuoteForm;
