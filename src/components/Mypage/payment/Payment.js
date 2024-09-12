import React, { useEffect, useState } from "react";
import style from "./Payment.module.scss";
import Container from "../../layout/container/Container";
import { db } from "../../../api/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { uid } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // payments 컬렉션에서 사용자 ID로 필터링합니다.
        const paymentsQuery = query(
          collection(db, "payments"),
          where("uid", "==", uid)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);

        // 결제 정보를 배열로 변환합니다.
        const resultData = paymentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(resultData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    if (uid) {
      fetchData();
    }
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
