import React, { useEffect, useState } from "react";
import Container from "../../layout/container/Container";
import styles from "../payment/PaymentDetail.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";
import axios from "axios";

function PaymentDetail() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { createdAt } = useParams();
  const [jwt, setJwt] = useState("");

  //  // JWT를 설정하는 함수 (로그인 시 호출)
  //  const handleLogin = async (username, password) => {
  //   try {
  //     const response = await axios.post("/login", { username, password });
  //     const { token } = response.data; // 서버에서 JWT를 받아옴
  //     setJwt(token); // 상태에 JWT 저장
  //   } catch (error) {
  //     console.error("로그인 에러:", error);
  //   }
  // };

  // // 결제 취소 함수 (아직 완성 안 됨)
  // const onPayCancel = async (pointCertify) => {
  //   const confirm = window.confirm("결제번호: " + pointCertify + " / 결제를 취소하시겠습니까?");
  //   const impKey = process.env.REACT_APP_IMP_KEY;
  //   const impSecret = process.env.REACT_APP_IMP_SECRET;

  //   if (confirm) {
  //     try {
  //       // access_token을 받아옵니다.
  //       const response = await axios.post("/users/getToken", {
  //         imp_key: impKey,
  //         imp_secret: impSecret,
  //       }, { headers: { "Content-Type": "application/json" } });

  //       const { access_token } = response.data.response;
  //       console.log("받아온 access_token:", access_token);

  //       // 취소요청
  //       await getCancelData(access_token, pointCertify);
  //     } catch (error) {
  //       console.error("토큰 추출 에러 발생: ", error);
  //     }
  //   }
  // }

  // // 취소요청을 하는 함수입니다.
  // const getCancelData = async (access_token, pointCertify) => {
  //   try {
  //     const response = await axios.post(
  //       "/payments/cancel",
  //       { imp_uid: pointCertify },
  //       { headers: { "Content-Type": "application/json", Authorization: `Bearer ${access_token}` } }
  //     );
  //     console.log("결제 취소 완료:", response.data);

  //     // Firebase에 저장되어 있는 데이터를 삭제합니다.
  //     await pointTableCancel(pointCertify);
  //   } catch (error) {
  //     console.error("결제 취소 에러 발생:", error);
  //   }
  // };

  // // Firebase에 저장되어 있는 데이터를 삭제하는 함수입니다.
  // const pointTableCancel = async (pointCertify) => {
  //   try {
  //     console.log("넘어가는 결제 번호: " + pointCertify);
  //     const response = await axios.post(
  //       "http://localhost:3000/admin/userPointTable/cancel",
  //       { pointCertify },
  //       { headers: { Authorization: `Bearer ${jwt}` } }
  //     );

  //     console.log(response.data);
  //     fetchUserPoint();
  //   } catch (error) {
  //     console.error("결제 테이블 삭제 실패", error);
  //   }
  // }

  // const fetchUserPoint = async () => {
  // };

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
              <p>결제 방식: {data.paymentMethod}</p>
              <p>현금영수증: </p>
              <button
                type="button"
                // onClick={() => onPayCancel(data.imp_uid)}
              >
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
