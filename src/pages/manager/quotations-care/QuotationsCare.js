import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { TbPencilSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import * as XLSX from "xlsx";
import SearchBox from "../../../components/search_box/SearchBox";
import { fetchPayments } from "../../../store/payment/paymentsSlice";
import styles from "./QuotationsCare.module.scss";
import { Link } from "react-router-dom";

// listItems 변수는 firebase에서 데이터를 가져와서 메모리에 저장합니다.
// 이를 기반으로 검색 기능 구현 및 초기 데이터를 렌더링 합니다.
let listItems;

function QuotationsCare() {
  const { payments, isLoading } = useSelector((state) => state.paymentsSlice);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  // listItems에 데이터를 저장하는 함수 (QuotationsCare에서 호출)
  const setListItems = (data) => {
    listItems = data; // 데이터 저장
  };

  useEffect(() => {
    dispatch(fetchPayments("payments"));
  }, [dispatch]);

  // payments를 listItems에 저장
  useEffect(() => {
    setListItems(payments);
  }, [payments]);

  // firebase의 데이터를 excel로 불러옵니다.
  const exportToExcel = () => {
    // 데이터 변환
    // "payments" 컬렉션에 배열로 저장되어 있는 additionalOptions의 내용들을 문자열로 변환합니다.
    const processedData = payments.map((payment) => ({
      ...payment,
      additionalOptions: payment.additionalOptions
        ? payment.additionalOptions.join(", ")
        : "",
    }));
    const worksheet = XLSX.utils.json_to_sheet(processedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "결제 내역");

    // 엑셀 파일 생성
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // 파일 다운로드
    saveAs(file, "결제 내역.xlsx");
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // 전체 데이터를 가지고 있는 listItems를 활용해
    // 사용자가 입력한 키워드를 데이터에 포함하고 있는 객체를 원소로 가지는 배열을 만든다.
    // 만들어진 배열을 items state에 set 합니다.
    setItems(listItems.filter(({ name }) => name.includes(keyword)));
  };

  return (
    <div className={styles.quotations}>
      {isLoading ? (
        <BeatLoader color="#9a9a9a" />
      ) : (
        <>
          <SearchBox
            name={<TbPencilSearch />}
            placeholder={"견적 의뢰서 검색"}
            onChange={handleKeywordChange}
            onClick={handleSearch}
          />
          <button onClick={exportToExcel}>견적 내역 다운로드</button>
          <div>
            {payments.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>작물 종류</th>
                    <th>농장 종류</th>
                    <th>주문번호</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.cropType}</td>
                      <td>{item.facilityType}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <Link to={`/mypage/${item.createdAt}`} state={{ item }}>
                          <button className={styles.button}>자세히 보기</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default QuotationsCare;
