import React, { useEffect, useState } from "react";
import SearchAddr from "../../../components/search-addr/SearchAddr";
import { installation } from "../../../lib/requestOption";
import styles from "./RequestForm.module.scss";
import RequestOptions from "./request-options/RequestOptions";

function RequestForm({ user, onSubmit }) {
  const [farmAddr, setFarmAddr] = useState("");
  const [option, setOption] = useState("facility");
  const [farmName, setFarmName] = useState("");
  const [cropType, setCropType] = useState("딸기");
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [farmArea, setFarmArea] = useState(0);
  const [farmEquivalent, setFarmEquivalent] = useState(0);

  useEffect(() => {
    if (user) {
      setFarmAddr(user.farmAddress || "");
    }
  }, [user]);

  const handleGetAddr = (addr) => {
    setFarmAddr(addr);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    console.log(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;

    setAdditionalOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };

      if (checked) {
        updatedOptions[id] = true;
      } else {
        delete updatedOptions[id];
      }
      return updatedOptions;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataObj = {
      farmAddress: farmAddr,
      cropType: cropType,
      option: option,
      additionalOptions: Object.keys(additionalOptions).filter(
        (key) => additionalOptions[key]
      ),
      farmArea: farmArea,
      farmName: farmName,
      farmEquivalent: farmEquivalent,
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
        <select onChange={handleOptionChange}>
          <option value="facility">시설원예</option>
          <option value="openGround">노지</option>
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
        <RequestOptions
          option={installation[option]}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <button type="submit">결제</button>
      <button type="button">추가 의뢰</button>
    </form>
  );
}

export default RequestForm;
