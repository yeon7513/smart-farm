import axios from "axios";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { db } from "../../../api/firebase";
import Container from "../../../components/layout/container/Container";
import styles from "./PaymentDetail.module.scss";
import { renameOptionsKor } from "./../../../utils/renameOptions";

function PaymentDetail() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState({}); // 부가옵션 초기값은 빈 객체입니다.
  const { paymentsDocId } = useParams();
  const navigate = useNavigate();

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
    if (!data || !data.createdAt) return;

    const confirm = window.confirm(
      `결제번호: ${data.createdAt} / 결제를 취소하시겠습니까?`
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
  const deletePaymentData = async (docId) => {
    try {
      const paymentDocRef = doc(db, "payments", docId);
      await deleteDoc(paymentDocRef);
    } catch (error) {
      console.error("Firebase 데이터 삭제 에러: ", error);
    }
  };

  // 결제 취소 요청 함수
  const cancelPayment = async (accessToken, imp_uid) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL ||
          "http://api.iamport.kr/payments/cancel",
        { imp_uid },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (response.status !== 200 || response.data.code !== 0) {
        throw new Error("결제 취소 요청 실패");
      }

      return response.data;
    } catch (error) {
      console.error("결제 취소 에러 발생: ", error);
    }
  };

  // 뒤로 가기 함수
  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // payments 컬렉션에서 데이터 가져오기
        const paymentDocRef = doc(db, "payments", paymentsDocId);
        const paymentSnapshot = await getDoc(paymentDocRef);

        if (paymentSnapshot.exists()) {
          const paymentData = paymentSnapshot.data();
          setData(paymentData);

          // sector 컬렉션에서 데이터 가져오기
          const sectorQuery = query(collection(paymentDocRef, "sector"));
          const sectorSnapshot = await getDocs(sectorQuery);

          const additionalOptions = {};
          sectorSnapshot.forEach((doc) => {
            const options = doc.data().부가옵션 || {};
            const equivalent = doc.id;
            additionalOptions[equivalent] = Object.entries(options);
          });

          setAdditionalOptions(additionalOptions);
        } else {
          console.log("Payment data not found");
          setData(null);
        }

        // dashboard 컬렉션에서 데이터 가져오기
        const dashboardQuery = query(collection(db, "dashboard"));
        const dashboardSnapshot = await getDocs(dashboardQuery);

        if (!dashboardSnapshot.empty) {
          const dashboardData = dashboardSnapshot.docs.map((doc) => doc.data());
          setDashboardData(dashboardData[0]); // 첫 번째 문서 데이터 설정
        } else {
          console.log("Dashboard data not found");
          setDashboardData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paymentsDocId]);

  return (
    <div>
      <Container>
        <div className={styles.payment}>
          {loading ? (
            <GridLoader color="#a2ca71" margin={5} size={20} />
          ) : data && dashboardData ? (
            <>
              <h2>견적 내역</h2>
              <div className={styles.main}>
                <div>
                  <div>
                    <p>이름: {data.name}</p>
                  </div>
                  <div>
                    <p>아이디: {data.email}</p>
                  </div>
                  <div>
                    <p>연락처: {data.number}</p>
                  </div>
                  <div>
                    <p>
                      주문 날짜:{" "}
                      {new Date(data.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <div>
                    <p>주소: {data.address}</p>
                  </div>
                  <div>
                    <p>주문번호: {data.createdAt}</p>
                  </div>
                </div>

                <div className={styles.farm}>
                  <p>농장 이름: {data.farmName}</p>
                  <p>농장 주소: {data.farmAddress}</p>
                  <p>작물 종류: {data.cropType}</p>
                  <p>농장 종류: {data.facilityType}</p>
                  <p>농장 면적: {data.farmArea}</p>
                  <p>농장 동 수: {data.farmEquivalent}</p>
                </div>
              </div>
              <div className={styles.option}>
                <p>내가 선택한 옵션</p>
              </div>
              {data.farmEquivalent &&
              Object.keys(additionalOptions).length > 0 ? (
                <div className={styles.farm_main}>
                  <ul>
                    {Object.entries(additionalOptions).map(
                      ([key, options], index) => (
                        <li key={key}>
                          {index + 1}동:{" "}
                          {options.length > 0
                            ? options.map(([optionKey, value]) => (
                                <span key={optionKey}>
                                  {renameOptionsKor(optionKey)}
                                </span>
                              ))
                            : "선택된 옵션이 없습니다."}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <p>선택된 옵션이 없습니다.</p>
              )}

              <div className={styles.pay_button}>
                <button
                  type="button"
                  onClick={onPayCancel}
                  className={styles.onpay}
                >
                  주문 취소
                </button>
                <button type="button" onClick={goBack} className={styles.back}>
                  뒤로 가기
                </button>
              </div>
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
