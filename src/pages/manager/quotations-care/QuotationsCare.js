import { saveAs } from "file-saver";
import React, { useEffect } from "react";
import { TbPencilSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import * as XLSX from "xlsx";
import SearchBox from "../../../components/search_box/SearchBox";
import { fetchPayments } from "../../../store/payment/paymentsSlice";
import styles from "./QuotationsCare.module.scss";

function QuotationsCare() {
  const { payments, isLoading } = useSelector((state) => state.paymentsSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPayments("users"));
  }, [dispatch, payments]);

  // firebase의 데이터를 excel로 불러옵니다.
  const exportToExcel = () => {
    // 데이터 변환
    const worksheet = XLSX.utils.json_to_sheet(payments);
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
            {/* {payments.map(data => (
              <span>{data}</span>
            ))} */}
          </div>
        </>
      )}
    </div>
  );
}

export default QuotationsCare;
