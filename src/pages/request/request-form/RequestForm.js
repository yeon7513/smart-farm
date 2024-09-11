import React, { useEffect, useState } from "react";
import SearchAddr from "../../../components/search-addr/SearchAddr";
import styles from "./RequestForm.module.scss";
import FacilitiesHorticulture from "../FacilitiesHorticulture";
import OpenGround from "../OpenGround";
import Checkout from "../Checkout";
import { useSelector } from "react-redux";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../api/firebase";

function RequestForm({ user, onSubmit }) {
  const [cropType, setCropType] = useState("딸기");
  const [farmAddress, setFarmAddress] = useState("");
  const [facilityType, setFacilityType] = useState("시설원예");
  const [farmName, setFarmName] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [farmEquivalent, setFarmEquivalent] = useState("");
  const [additionalOptions, setAdditionalOptions] = useState({});
  const [requestData, setRequestData] = useState([]);
  const [accumulatedData, setAccumulatedData] = useState([]);
  const { uid } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (!user) {
      setFarmAddress(user.farmAddress || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.value;

    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{0,8}$/;

    if (regex.test(value)) {
      setFarmName(value);
    } else {
      return false;
    }
  };

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
        updatedOptions[value] = value;
      }
      console.log(updatedOptions);
      return updatedOptions;
    });
  };

  const handleSubmit = async (e) => {
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

    try {
      if (uid) {
        // 사용자의 결제내역에 데이터를 추가합니다.
        const userDocRef = doc(db, "users", uid);
        const paymentCollectionRef = collection(userDocRef, "payments");
        await addDoc(paymentCollectionRef, dataObj);
        console.log("데이터가 성공적으로 추가되었습니다.");

        // 데이터를 업데이트 합니다.
        setAccumulatedData((prevData) => [...prevData, dataObj]);

        // 데이터를 추가하고 초기화합니다.
        setRequestData([]);
      } else {
        console.error("사용자 ID가 설정되지 않았습니다.");
      }
    } catch (error) {
      console.error("에러가 발생하였습니다: ", error);
    }
  };

  return (
    <form className={styles.requestForm} onSubmit={handleSubmit}>
      <div className={styles.userContainer}>
        <div className={styles.user}>
          <div>
            <h3>신청인: </h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3>연락처: </h3>
            <p>{user.number}</p>
          </div>
        </div>
        <div className={styles.farmAddress}>
          <h3>농장 주소: </h3>
          <SearchAddr getAddr={handleGetAddr} className={styles.addr} />
        </div>
        <div className={styles.farmName}>
          <h3>농장 이름: </h3>5
          <input
            type="text"
            placeholder={"농장 이름을 입력해주세요."}
            onChange={(e) => setFarmName(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.farm}>
        <div className={styles.cropType}>
          <div>
            <h3>작물 종류: </h3>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
            >
              <option value="딸기">딸기</option>
              <option value="블루베리">블루베리</option>
              <option value="파프리카">파프리카</option>
              <option value="토마토">토마토</option>
              <option value="참외">참외</option>
            </select>
          </div>
          <div>
            <h3>농장 선택: </h3>
            <select value={facilityType} onChange={handleFacilityTypeChange}>
              <option value="시설원예">시설원예</option>
              <option value="노지">노지</option>
            </select>
          </div>
          <div className={styles.farmArea}>
            <h3>농장 면적:</h3>
            <input
              type="number"
              onChange={(e) => setFarmArea(Number(e.target.value))}
            />
            <button>평</button>
          </div>
          <div className={styles.farmEquivalent}>
            <h3>농장 동 수:</h3>
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
        </div>

        <div className={styles.option}>
          <h3>부가 옵션 선택: </h3>
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
        <div>
          <Checkout
            type="submit"
            description={"견적 내용 저장"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </form>
  );
}

export default RequestForm;
