import React, { useEffect, useState } from "react";
import Container from "../../layout/container/Container";
import styles from "../payment/PaymentDetail.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

function PaymentDetail() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { createdAt } = useParams();

  useEffect(() => {
    const paymentData = async () => {
      setLoading(true);
      try {
        // payments 컬렉션에서 주문번호로 필터링합니다.
        const paymentsQuery = query(
          collection(db, "payments"),
          where("createdAt", "==", createdAt)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);

        console.log(paymentsSnapshot);

        // 결제 정보를 배열로 변환합니다.
        const resultData = paymentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(resultData);
        setData(resultData.length > 0 ? resultData[0] : null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    paymentData();
  }, [createdAt]);
  return (
    <div>
      <Container>
        <div className={styles.payment}>
          {loading ? (
            <GridLoader color="#a2ca71" margin={5} size={20} />
          ) : data ? (
            <>
              <h2>견적 내역</h2>
              <p>이름: {data.name}</p>
              <p>연락처: {data.number}</p>
              <p>주소: {data.address}</p>
              <p>농장 이름: {data.farmName}</p>
              <p>농장 주소: {data.farmAddress}</p>
              <p>작물 종류: {data.cropType}</p>
              <p>농장 종류: {data.facilityType}</p>
              <p>농장 면적: {data.farmArea}</p>
              <p>농장 동 수: {data.farmEquivalent}</p>
              <p>부가 옵션: {data.additionalOptions.join(", ")}</p>
              <p>주문번호: {data.createdAt}</p>
              <p>
                결제 방식: 카드 or 현금?(나중에 이것도 결제 방식에 따라 나오게
                할 예정)
              </p>
            </>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default PaymentDetail;
