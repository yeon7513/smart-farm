import { saveAs } from "file-saver";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TbPencilSearch } from "react-icons/tb";
import { BeatLoader } from "react-spinners";
import * as XLSX from "xlsx";
import { db } from "../../../api/firebase";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./QuotationsCare.module.scss";

function QuotationsCare() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // payments 컬렉션에서 견적 정보를 가져옵니다.
        const paymentsSnapshot = await getDocs(collection(db, "payments"));

        // 사용자 정보와 결제 정보를 결합합니다.
        const resultData = paymentsSnapshot.docs.map((payment) => {
          const paymentData = payment.data();
          return {
            ...paymentData,
          };
        });

        setData(resultData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // firebase의 데이터를 excel로 불러옵니다.
  const exportToExcel = () => {
    // 데이터 변환
    const worksheet = XLSX.utils.json_to_sheet(data);
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
      {loading ? (
        <BeatLoader color="#9a9a9a" />
      ) : (
        <>
          <SearchBox
            name={<TbPencilSearch />}
            placeholder={"견적 의뢰서 검색"}
          />
          <button onClick={exportToExcel}>견적 내역 다운로드</button>
        </>
      )}
    </div>
  );
}

export default QuotationsCare;
