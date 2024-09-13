import React, { useEffect, useState } from "react";
import style from "./Payment.module.scss";
import Container from "../../layout/container/Container";
import { db } from "../../../api/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // users 컬렉션의 사용자 정보를 가져옵니다.
        const usersSnapshot = await getDocs(collection(db, "users"));

        // users 컬렉션 안의 payments 컬렉션의 주문 내역을 가져옵니다.
        const dataPromises = usersSnapshot.docs.map(async (userDoc) => {
          const userId = userDoc.id;
          const userData = userDoc.data();

          // users 컬렉션의 이름, 전화번호, 주소 추출
          const { name, number, address } = userData;

          // payments 컬렉션에서 견적 정보를 가져옵니다.
          const paymentsSnapshot = await getDocs(
            collection(doc(db, "users", userId), "payments")
          );
          const paymentsData = paymentsSnapshot.docs.map((paymentDoc) => {
            const paymentData = paymentDoc.data();
            return {
              name,
              number,
              address,
              ...paymentData,
            };
          });

          // 사용자 정보와 합하여 출력합니다.
          return paymentsData;
        });

        // Promise를 배열로 반환
        const allPaymentsData = await Promise.all(dataPromises);

        // 데이터를 평탄화하여 하나의 배열로 생성
        setData(allPaymentsData.flat());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // firebase의 데이터를 excel로 보냅니다.
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
    // saveAs(file, "결제 내역.xlsx");
  };

  return (
    <Container>
      <div className={style.payment}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={exportToExcel}>잘 되나 테스트</button>
        )}
      </div>
    </Container>
  );
};

export default Payment;
