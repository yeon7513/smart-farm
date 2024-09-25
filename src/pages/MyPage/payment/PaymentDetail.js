import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { db } from "../../../api/firebase";
import Container from "../../../components/layout/container/Container";
import styles from "./PaymentDetail.scss";
import axios from "axios";

function PaymentDetail() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { imp_uid } = useParams();

  // 액세스 토큰을 받아오는 함수입니다.
  const getAccessToken = async () => {
    const impKey = process.env.REACT_APP_IMP_KEY; // 본인의 IMP 키
    const impSecret = process.env.REACT_APP_IMP_SECRET; // 본인의 IMP 비밀키

    try {
      const response = await axios.post(
        "https://api.iamport.kr/users/getToken",
        {
          imp_key: impKey,
          imp_secret: impSecret,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code !== 0) {
        throw new Error("토큰을 가져오는 데 실패했습니다.");
      }

      return response.data.response.access_token;
    } catch (error) {
      console.error("액세스 토큰 가져오기 에러:", error);
      throw error;
    }
  };

  // 결제 취소 함수
  const onPayCancel = async () => {
    if (!data) return;

    const confirm = window.confirm(
      `결제번호: ${data.imp_uid} / 결제를 취소하시겠습니까?`
    );

    if (confirm) {
      setLoading(true);
      try {
        // 결제 취소 API 호출
        const accessToken = await getAccessToken();
        await cancelPayment(accessToken, data.imp_uid);

        console.log(accessToken);

        // Firebase에서 데이터 삭제
        await deletePaymentData(data.imp_uid);
      } catch (error) {
        console.error("결제 취소 에러 발생: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Firebase에서 결제 데이터 삭제
  const deletePaymentData = async (imp_uid) => {
    const paymentDocRef = doc(db, "payments", imp_uid); // pointCertify를 문서 ID로 사용
    await deleteDoc(paymentDocRef);
  };

  // 결제 취소 요청 함수
  const cancelPayment = async (accessToken, imp_uid) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL ||
          "http://localhost:3000/api/cancelPayment",
        { imp_uid },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status !== 200) {
        throw new Error("결제 취소 요청 실패");
      }
    } catch (error) {
      console.error("결제 취소 에러 발생: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!imp_uid) return;
      setLoading(true);
      try {
        // "dashboard" 컬렉션에서 imp_uid 가져오기
        const dashboardQuery = query(
          collection(db, "dashboard"),
          where("imp_uid", "==", imp_uid)
        );
        const dashboardSnapshot = await getDocs(dashboardQuery);

        if (dashboardSnapshot.empty) {
          console.log("Dashboard data not found");
          setData(null);
          return;
        }

        // "payments" 컬렉션에서 imp_uid 가져오기
        const paymentsQuery = query(
          collection(db, "payments"),
          where("imp_uid", "==", imp_uid)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);

        if (paymentsSnapshot.empty) {
          console.log("Payments data not found");
          setData(null);
          return;
        }

        const resultData = paymentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(resultData.length > 0 ? resultData[0] : null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [imp_uid]);

  return (
    <div>
      <Container>
        <div className={styles.payment}>
          {loading ? (
            <GridLoader color="#a2ca71" margin={5} size={20} />
          ) : data ? (
            <>
              {/* 관리자의 경우 견적 내역이 마이페이지가 아닌 새로운 팝업으로 뜰 것 */}
              <h2>견적 내역</h2>
              <p>이름: {data.name}</p>
              <p>아이디: {data.email}</p>
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
              <p>결제 방식: {data.paymentMethod}</p>
              <p>현금영수증: {data.cashReceipt}</p>
              <button type="button" onClick={onPayCancel}>
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
