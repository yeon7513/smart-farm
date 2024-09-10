import React, { useEffect, useState } from "react";
import SearchAddr from "../../../components/search-addr/SearchAddr";
import { installation } from "../../../lib/requestOption";
import styles from "./RequestForm.module.scss";
import RequestOptions from "./request-options/RequestOptions";

function RequestForm({ user, onSubmit }) {
  const [farmAddr, setFarmAddr] = useState("");
  const [option, setOption] = useState("facility");
  const [farmName, setFarmName] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [farmArea, setFarmArea] = useState(0);
  const [farmEquivalent, setFarmEquivalent] = useState(0);

  const handleGetAddr = (addr) => {
    setFarmAddr(addr);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    console.log(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setAdditionalOptions((prevOptions) =>
      checked
        ? { ...prevOptions, [id]: checked }
        : prevOptions.filter((option) => option !== id)
    );
  };

  useEffect(() => {
    const dataObj = {
      farmAddress: farmAddr,
      option: option,
      additionalOptions: Object.keys(additionalOptions),
      farmArea: farmArea,
      farmName: farmName,
      farmEquivalent: farmEquivalent,
    };
    onSubmit(dataObj);
  }, [
    farmAddr,
    option,
    additionalOptions,
    farmArea,
    farmName,
    farmEquivalent,
    onSubmit,
  ]);

  return (
    <form className={styles.requestForm}>
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
          type="number"
          onChange={(e) => setFarmEquivalent(Number(e.target.value))}
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
        <RequestOptions
          option={installation[option]}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <button>결제</button>
      <button>추가 의뢰</button>
    </form>
  );
}

export default RequestForm;
