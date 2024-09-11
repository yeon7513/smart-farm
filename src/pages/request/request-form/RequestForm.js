import React, { useEffect, useState } from "react";
import SearchAddr from "../../../components/search-addr/SearchAddr";
import { installation } from "../../../lib/requestOption";
import styles from "./RequestForm.module.scss";
import RequestOptions from "./request-options/RequestOptions";
import FacilitiesHorticulture from "../FacilitiesHorticulture";
import OpenGround from "../OpenGround";
import Checkout from "../Checkout";

function RequestForm({ user, onSubmit }) {
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
    if (!user) {
      setFarmAddress(user.farmAddress || "");
    }
  }, [user]);

  const handleGetAddr = (addr) => {
    setFarmAddress(addr);
  };

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
        updatedOptions[value] = value;
      }
      //   console.log(Object.keys(updatedOptions));
      console.log(updatedOptions);
      return updatedOptions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const createdAt = `${year}${month}${day}${new Date().getTime()}`;

    const dataObj = {
      farmAddress: farmAddress,
      cropType: cropType,
      facilityType: facilityType,
      additionalOptions: Object.keys(additionalOptions).filter(
        (key) => additionalOptions[key]
      ),
      farmArea: farmArea,
      farmName: farmName,
      farmEquivalent: farmEquivalent,
      createdAt: createdAt,
    };
    console.log(dataObj);
    onSubmit(dataObj);
  };

  return (
    <form className={styles.requestForm} onSubmit={handleSubmit}>
      <div className={styles.user}>
        <h3>신청인</h3>
        <p>{user.name}</p>
        <div>
          <h3>연락처</h3>
          <p>{user.number}</p>
        </div>
      </div>

      <div className={styles.farmAddress}>
        <h3>농장 주소</h3>
        <SearchAddr getAddr={handleGetAddr} />
      </div>
      <div className={styles.farmName}>
        <h3>농장 이름</h3>
        <input
          type="text"
          placeholder={"농장 이름을 입력해주세요."}
          onChange={(e) => setFarmName(e.target.value)}
        />
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
          min="1"
          onChange={(e) => setFarmArea(Number(e.target.value))}
        />
        {/*  */}
        <button>평</button>
      </div>
      <div className={styles.farmEquivalent}>
        <h3>농장 동 수</h3>
        <select
          value={farmEquivalent}
          onChange={(e) => setFarmEquivalent(Number(e.target.value))}
        >
          <option value="0">값을 선택하여 주시기 바랍니다.</option>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
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

export default RequestForm;
