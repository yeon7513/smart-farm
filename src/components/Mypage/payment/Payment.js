import React, { useEffect, useState } from "react";
import style from "./Payment.module.scss";
import Container from "../../layout/container/Container";
import { db } from "../../../api/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { uid } = useSelector((state) => state.userSlice);

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

          // 현재 로그인 되어있는 사용자의 주문내역만 추출합니다.
          if (uid === userId) {
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
          }
          // uid와 userId가 일치하지 않은 경우 주문내역을 반환하지 않습니다.
          return [];
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
                      <td>{item.additionalOptions}</td>
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
