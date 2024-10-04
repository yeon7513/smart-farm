import React, { useEffect, useRef, useState } from "react";
import styles from "./InfoInput.module.scss";
import { CiSearch } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

function InfoInput({ onSearch, resetSearch }) {
  const [selectedBig, setSelectedBig] = useState([]); // 첫 번째 셀렉트 박스의 옵션을 저장
  const [middleOptions, setMiddleOptions] = useState([]); // 두 번째 셀렉트 박스 옵션저장
  const [selectedMiddle, setSelectedMiddle] = useState([]); // 세 번째 셀렉트 박스 옵션저장.
  const [cropCode, setCropCode] = useState(""); // 최종적으로 선택된 작물 코드 저장
  const [items, setItems] = useState([]); // 조회된 결과 항목들을 저장.
  const [inputValue, setInputValue] = useState("");
  const lastSelectRef = useRef();
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  // 상태를 초기화하는 리셋핸들러
  const handleReset = () => {
    setInputValue("");
    setSelectedBig([]);
    setMiddleOptions([]);
    setSelectedMiddle([]);
    setCropCode("");
    setIsInputDisabled(false); // input 비활성화 해제
    setIsSelectDisabled(false); // 셀렉트박스 비활성화 해제
    setIsSearchDisabled(true);
    if (lastSelectRef.current) {
      lastSelectRef.current.value = "";
    }
    onSearch("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSelectDisabled(value.length > 0);
    checkSearchButtonState(value, lastSelectRef.current?.value);
  };
  // 입력창에서 Enter 키를 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    // 입력값이 있는 경우
    if (inputValue.length > 0) {
      onSearch(inputValue); // 입력값으로 검색 실행
    }
    // 입력값이 없고 셀렉트 박스에서 값이 선택되지 않은 경우
    else if (lastSelectRef.current?.value && cropCode) {
      onSearch(lastSelectRef.current.selectedOptions[0].text);
    }
    // 첫 번째 셀렉트 박스에서 선택됨, 두 번째 셀렉트 박스에서 선택됨, 마지막 셀렉트 박스에서 선택되지 않은 경우
    else if (selectedBig.length > 0 && middleOptions.length > 0 && !cropCode) {
      alert("세 번째 작물까지 선택해주세요.");
    }
    // 첫 번째 또는 두 번째 셀렉트 박스에서 선택되지 않은 경우
    else if (!selectedBig.length || !middleOptions.length) {
      alert("작물을 선택해 주세요.");
    }
  };
  // 첫 번쨰 셀렉트 박스 변경 핸들러
  const handleBigChang = async (e) => {
    const value = e.target.value; //사용자가 선택한 대분류값
    const apiKey = process.env.REACT_APP_DISEASESLIST_API_KEY;

    try {
      // 선택된 대분류 값을 기반으로 중분류 데이터를 가져오는 api호출
      const response = await fetch(
        `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr2&sKncrCode1=${value}`
      );
      // API 호출에 문제가 있을 경우 오류를 발생시킴
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // API로부터 받은 데이터를 JSON으로 변환
      const result = await response.json();
      // 중분류 셀렉트 박스의 옵션을 저장
      setMiddleOptions(result.service.srchKncrList2);
      setIsInputDisabled(true);
      checkSearchButtonState(inputValue, lastSelectRef.current?.value);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  //  두번째 셀렉트 박스 병경 핸들러

  const handleMiddleChang = async (e) => {
    const value = e.target.value; //사용자가 선택한 중분류 값
    const apiKey = process.env.REACT_APP_DISEASESLIST_API_KEY;
    try {
      const response = await fetch(
        `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr3&sKncrCode1=${value}&sKncrCode2=${value}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      // 소분류 셀렉트 박스의 옵션을 설정
      setSelectedMiddle(result.service.srchKncrList3);
      checkSearchButtonState(inputValue, lastSelectRef.current?.value);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // 세번째 셀렉트 박스 변경 핸들러(소분류)
  const handleSmallChange = (e) => {
    const value = e.target.value; //사용자가 선택한 소분류 값
    setCropCode(value); //선택된 소분류 값으로 작물 코드 설정
    checkSearchButtonState(inputValue, value);
    // onSearch(e.target.selectedOptions[0].text);
  };

  // 셀렉트 박스
  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    const apiKey = process.env.REACT_APP_DISEASESLIST_API_KEY;

    const fetchData = async () => {
      try {
        // 대분류(첫 번째 셀렉트 박스)의 데이터를 가져오는 API 호출
        const response = await fetch(
          `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr1&displayCount=9`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // 대분류 셀렉트 박스의 옵션을 설정
        setSelectedBig(result.service.srchKncrList1);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);
  const checkSearchButtonState = (inputValue, cropCode) => {
    const isBigSelected = selectedBig.length > 0;
    const isMiddleSelected = middleOptions.length > 0;
    const isSmallSelected = cropCode.length > 0;

    if (
      inputValue.length > 0 ||
      (isBigSelected && isMiddleSelected && isSmallSelected)
    ) {
      setIsSearchDisabled(false);
    } else {
      setIsSearchDisabled(true);
    }
  };
  //
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <div className={styles.input}>
          <div className={styles.input_item}>
            <span>작물명</span>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isInputDisabled}
            />
          </div>
        </div>

        <div className={styles.select_box}>
          <div className={styles.select_box_item}>
            <span>작물</span>

            {/* 첫번째 셀렉트박스 */}
            <select onChange={handleBigChang} disabled={isSelectDisabled}>
              {selectedBig.map((item, idx) => (
                <option key={idx} value={item.sKncrCode1}>
                  {/* {item.cropSectionName} */}
                  {item.sKncrNm1}
                </option>
              ))}
            </select>
            {/* 두번째 셀렉트박스 */}
            <select onChange={handleMiddleChang} disabled={isSelectDisabled}>
              {middleOptions.map((item, idx) => (
                <option key={idx} value={item.sKncrCode2}>
                  {item.sKncrNm2}
                </option>
              ))}
            </select>
            {/* 세번째 셀렉트박스 */}
            <select
              onChange={handleSmallChange}
              ref={lastSelectRef}
              disabled={isSelectDisabled}
            >
              {selectedMiddle.map((item, idx) => (
                <option key={idx} value={item.sKncrCode3}>
                  {item.sKncrNm3}
                </option>
              ))}
            </select>
            <div className={styles.reset}>
              <button onClick={handleReset}>
                <GrPowerReset />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.btn}>
        <button onClick={handleSearch}>
          <span>
            <CiSearch />
            조회
          </span>
        </button>
      </div>
    </div>
  );
}

export default InfoInput;
