import React, { useEffect, useState } from "react";
import style from "./Payment.module.scss";
import Container from "../../layout/container/Container";
import { db } from "../../../api/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { uid } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // payments 컬렉션의 사용자 정보를 가져옵니다.
        const paymentsSnapshot = await getDocs(collection(db, "payments"));

        // 결제 정보를 배열로 변환합니다.
        const allPaymentsData = paymentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // 로그인 되어있는 사용자의 결제 내역만 불러옵니다.
        const filteredPaymentsData = allPaymentsData.filter(
          (payment) => payment.id === uid
        );

        const resultData = filteredPaymentsData.map((payment) => ({
          ...payment,
          additionalOptions: Array.isArray(payment.additionalOptions)
            ? payment.additionalOptions.join(", ")
            : payment.additionalOptions,
        }));

        setData(resultData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [uid]);

  return (
    <Container>
      <div className={style.payment}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>연락처</th>
                    <th>주소</th>
                    <th>농장 주소</th>
                    <th>작물 종류</th>
                    <th>농장 종류</th>
                    <th>농장 면적 (단위: 평)</th>
                    <th>농장 동 수</th>
                    <th>부가 옵션</th>
                    <th>주문번호</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                      <td>{item.address}</td>
                      <td>{item.farmAddress}</td>
                      <td>{item.cropType}</td>
                      <td>{item.facilityType}</td>
                      <td>{item.farmArea}</td>
                      <td>{item.farmEquivalent}</td>
                      <td>{item.additionalOptions.join(", ")}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default Payment;
