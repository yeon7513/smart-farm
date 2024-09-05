import React, { useEffect, useRef, useState } from "react";
import styles from "./InfoInput.module.scss";
import { CiSearch } from "react-icons/ci";
function InfoInput({ onSearch }) {
  const [selectedBig, setSelectedBig] = useState([]); // 첫 번째 셀렉트 박스의 옵션을 저장
  const [middleOptions, setMiddleOptions] = useState([]); // 두 번째 셀렉트 박스 옵션저장
  const [selectedMiddle, setSelectedMiddle] = useState([]); // 세 번째 셀렉트 박스 옵션저장.
  const [cropCode, setCropCode] = useState(""); // 최종적으로 선택된 작물 코드 저장
  const [items, setItems] = useState([]); // 조회된 결과 항목들을 저장.
  const [inputValue, setInputValue] = useState("");
  const lastSelectRef = useRef();
  // const [isSearching, setIsSearching] = useState(false); // 검색 중 여부 저장

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // setIsSearching(value.length > 0);
  };
  // 입력창에서 Enter 키를 눌렀을 때 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    if (inputValue.length > 0) {
      onSearch(inputValue); // 검색어를 부모 컴포넌트로 전달
    } else {
      onSearch(lastSelectRef.current.selectedOptions[0].text);
    }

    // setIsSearching(true);
  };
  // 첫 번쨰 셀렉트 박스 변경 핸들러
  const handleBigChang = async (e) => {
    const value = e.target.value; //사용자가 선택한 대분류값
    console.log(value); // 선택된 대분류 값을 콘솔에 출력
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";

    try {
      // 선택된 대분류 값을 기반으로 중분류 데이터를 가져오는 api호출
      const response = await fetch(
        `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr2&sKncrCode1=${value}`
      );
      // API 호출에 문제가 있을 경우 오류를 발생시킴
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // console.log(response);

      // API로부터 받은 데이터를 JSON으로 변환
      const result = await response.json();
      // 중분류 셀렉트 박스의 옵션을 저장
      setMiddleOptions(result.service.srchKncrList2);
      // onFilterChange({ selectedBig: value, selectedMiddle: "", cropCode: "" });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  //  두번째 셀렉트 박스 병경 핸들러

  const handleMiddleChang = async (e) => {
    const value = e.target.value; //사용자가 선택한 중분류 값
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
      // 소분류 셀렉트 박스의 옵션을 설정
      setSelectedMiddle(result.service.srchKncrList3);
      console.log(result.service.srchKncrList3);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // 세번째 셀렉트 박스 변경 핸들러(소분류)
  const handleSmallChange = (e) => {
    const value = e.target.value; //사용자가 선택한 소분류 값
    console.log(value);
    setCropCode(value); //선택된 소분류 값으로 작물 코드 설정
    // onSearch(e.target.selectedOptions[0].text);
  };

  const handleFullClick = async (e) => {
    const value = e.target.value;
    console.log(value); // 선택된 대분류 값을 콘솔에 출력
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";

    // const handleInputChange = (e) => {
    //   setInputValue(e.target.value);
    // };
    // const handleSearch = () => {
    //   onSearch(inputValue); // Pass the search term back to the parent (DiseasesList)
    // };

    try {
      // 선택된 작물 코드를 기반으로 작물 정보를 가져오는 API 호출
      const response = await fetch(
        `/desease/?apiKey=${apiKey}&serviceCode=SVC16&serviceType=AA003&cropCode=${cropCode}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response); // 응답 객체를 콘솔에 출력
      const result = await response.json();
      // 조회된 결과를 상태로 저장
      setItems(result.service.list);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    // console.log(items);
  };

  // 셀렉트 박스
  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";

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
        console.log(result);
        // 대분류 셀렉트 박스의 옵션을 설정
        setSelectedBig(result.service.srchKncrList1);
        // console.log(result.service.srchKncrList1);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

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
            />
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
            <select onChange={handleSmallChange} ref={lastSelectRef}>
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
        <button onClick={handleSearch}>
          <CiSearch />
          <span>조회</span>
        </button>
      </div>
    </div>
  );
}

export default InfoInput;
