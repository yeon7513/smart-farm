import React, { useEffect, useState } from "react";
import styles from "./InfoInput.module.scss";
import { CiSearch } from "react-icons/ci";
function InfoInput(props) {
  const [selectedBig, setSelectedBig] = useState([]); // 첫 번째 셀렉트 선택 값
  const [middleOptions, setMiddleOptions] = useState([]); // 두 번째 셀렉트 박스 옵션
  const [selectedMiddle, setSelectedMiddle] = useState([]); // 두 번째 셀렉트 선택 값
  const [cropCode, setCropCode] = useState(""); // 두 번째 셀렉트 선택 값
  const [items, setItems] = useState([]); // 두 번째 셀렉트 선택 값

  // 첫 번쨰 셀렉트 박스 변경 핸들러
  const handleBigChang = async (e) => {
    const value = e.target.value;

    console.log(value); // 선택된 대분류 값을 콘솔에 출력
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
    try {
      const response = await fetch(
        `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr2&sKncrCode1=${value}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // console.log(response);
      const result = await response.json();
      setMiddleOptions(result.service.srchKncrList2);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  //  두번째 셀렉트 박스 핸들러

  const handleMiddleChang = async (e) => {
    const value = e.target.value;

    console.log(value); // 선택된 대분류 값을 콘솔에 출력
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
    try {
      const response = await fetch(
        `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr3&sKncrCode1=${value}&sKncrCode2=${value}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // console.log(response);
      const result = await response.json();

      setSelectedMiddle(result.service.srchKncrList3);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSmallChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setCropCode(value);
  };

  const handleFullClick = async (e) => {
    const value = e.target.value;
    console.log(value); // 선택된 대분류 값을 콘솔에 출력
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";

    try {
      const response = await fetch(
        `/desease/?apiKey=${apiKey}&serviceCode=SVC16&serviceType=AA003&cropCode=${cropCode}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response);
      const result = await response.json();
      setItems(result.service.list);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    // console.log(items);
  };

  // 셀렉트 박스
  useEffect(() => {
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr1`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setSelectedBig(result.service.srchKncrList1);
        console.log(result.service.srchKncrList1);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <div className={styles.input}>
          <div className={styles.input_item}>
            <span>병/작물</span>
            <input type="text" />
          </div>
        </div>

        <div className={styles.select_box}>
          <div className={styles.select_box_item}>
            <span>작물</span>

            {/* 첫번째 셀렉트박스 */}
            <select onChange={handleBigChang}>
              {selectedBig.map((item, idx) => (
                <option key={idx} value={item.sKncrCode1}>
                  {/* {item.cropSectionName} */}
                  {item.sKncrNm1}
                </option>
              ))}
            </select>
            {/* 두번째 셀렉트박스 */}
            <select onChange={handleMiddleChang}>
              {middleOptions.map((item, idx) => (
                <option key={idx} value={item.sKncrCode2}>
                  {item.sKncrNm2}
                </option>
              ))}
            </select>
            {/* 세번째 셀렉트박스 */}
            <select onChange={handleSmallChange}>
              {selectedMiddle.map((item, idx) => (
                <option key={idx} value={item.sKncrCode3}>
                  {item.sKncrNm3}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={handleFullClick}>
          <CiSearch />
          <span>조회</span>
        </button>
      </div>
    </div>
  );
}

export default InfoInput;
