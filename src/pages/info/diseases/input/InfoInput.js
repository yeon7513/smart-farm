import React, { useEffect, useState } from "react";
import styles from "./InfoInput.module.scss";
import { CiSearch } from "react-icons/ci";
function InfoInput(props) {
  const big = ["과수", "사료녹비작물", "수목"]; // 첫번째

  // 두번째
  const middle = {
    과수: ["견과류", "소과류", "열대과수"],
    사료: ["사료작물"],
    수목: ["수목작물", "수목나무"],
  };

  // 세번째
  const small = {
    견과류: ["딸기"],
    소과류: ["귤", "바나나"],
    열대과수: ["망고", "파인애플"],
    사료작물: ["옥수수", "알팔파"],
    수목작물: ["소나무", "전나무"],
    수목나무: ["참나무", "단풍나무"],
  };

  const [selectedBig, setSelectedBig] = useState([]); // 첫 번째 셀렉트 선택 값
  const [middleOptions, setMiddleOptions] = useState([]); // 두 번째 셀렉트 박스 옵션
  const [selectedMiddle, setSelectedMiddle] = useState(""); // 두 번째 셀렉트 선택 값
  const [smallOptions, setSmallOptions] = useState([]); // 세 번째 셀렉트 박스 옵션

  // 첫 번쨰 셀렉트 박스 변경 핸들러
  const handleBigChang = (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedBig(value);
    setMiddleOptions(selectedMiddle[value] || []);
    setSelectedMiddle("");
    setSmallOptions([]);
  };

  //  두번째 셀렉트 박스 핸들러
  const handleMiddleChange = (e) => {
    const value = e.target.value;
    setSelectedMiddle(value);
    setSmallOptions(small[value] || []);
  };
  // 대분류
  useEffect(() => {
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/desease/?apiKey=${apiKey}&serviceCode=SVC11&serviceType=AA003`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // console.log(response);
        const result = await response.json();
        console.log(result.service.list);
        console.log(result.service.list.cropSectionName);
        setSelectedBig(result.service.list);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);
  // 중분류
  // useEffect(() => {
  //   const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `/desease/?apiKey=${apiKey}&serviceCode=SVC12&serviceType=AA003&cropSectionCode=1`
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       // console.log(response);
  //       const result = await response.json();
  //       console.log(result);
  //       setSelectedBig(result.service.list);
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
              <option value="" title="대분류">
                ::전체::
              </option>
              {selectedBig.map((item, idx) => (
                <option key={idx} value={item.cropSectionName}>
                  {item.cropSectionName}
                </option>
              ))}
            </select>
            {/* 두번째 셀렉트박스 */}
            <select onChange={handleMiddleChange}>
              <option value="">::전체::</option>
              {middleOptions.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {/* 세번째 셀렉트박스 */}
            <select>
              <option value="">::전체::</option>
              {smallOptions.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button>
          <CiSearch />
          <span>조회</span>
        </button>
      </div>
    </div>
  );
}

export default InfoInput;
