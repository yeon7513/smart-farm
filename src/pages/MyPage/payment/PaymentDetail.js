import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { db, pointTableCancel } from "../../../api/firebase";
import Container from "../../../components/layout/container/Container";
import styles from "./PaymentDetail.scss";
import axios from "axios";

function PaymentDetail() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { createdAt } = useParams();

  // 결제 취소 함수
  const onPayCancel = async (pointCertify) => {
    const confirm = window.confirm(
      `결제번호: ${pointCertify} / 결제를 취소하시겠습니까?`
    );

    if (confirm) {
      try {
        const impKey = process.env.REACT_APP_IMP_KEY;
        const impSecret = process.env.REACT_APP_IMP_SECRET;

        // access_token을 받아옵니다.
        const tokenResponse = await axios.post(
          "/users/getToken",
          {
            imp_key: impKey,
            imp_secret: impSecret,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const { access_token } = tokenResponse.data.response;

        // 결제 취소 요청
        const cancelResponse = await axios.post(
          "/payments/cancel",
          { imp_uid: pointCertify },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        console.log("결제 취소 완료: ", cancelResponse.data);

        // Firebase에서 결제 정보 삭제
        await pointTableCancel(pointCertify);
      } catch (error) {
        console.error("결제 취소 에러 발생: ", error);
      }
    }
  };

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
              <p>농장 위도: {data.lat}</p>
              <p>농장 경도: {data.lng}</p>
              <p>작물 종류: {data.cropType}</p>
              <p>농장 종류: {data.facilityType}</p>
              <p>농장 면적: {data.farmArea}</p>
              <p>농장 동 수: {data.farmEquivalent}</p>
              <p>부가 옵션: {data.additionalOptions.join(", ")}</p>
              <p>주문번호: {data.createdAt}</p>
              <p>결제 방식: {data.paymentMethod}</p>
              <p>현금영수증: </p>
              <button type="button" onClick={() => onPayCancel(data.createdAt)}>
                주문 취소
              </button>
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
