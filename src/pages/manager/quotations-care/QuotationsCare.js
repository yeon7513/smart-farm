import { saveAs } from "file-saver";
import React, { useEffect } from "react";
import { TbPencilSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import * as XLSX from "xlsx";
import SearchBox from "../../../components/search_box/SearchBox";
import { fetchPayments } from "../../../store/payment/paymentsSlice";
import styles from "./QuotationsCare.module.scss";
import { Link } from "react-router-dom";

function QuotationsCare() {
  const { payments, isLoading } = useSelector((state) => state.paymentsSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments("payments"));
  }, [dispatch]);

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
  return (
    <div className={styles.quotations}>
      {isLoading ? (
        <BeatLoader color="#9a9a9a" />
      ) : (
        <>
          <SearchBox
            name={<TbPencilSearch />}
            placeholder={"견적 의뢰서 검색"}
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
