import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../../api/firebase";
import Container from "../../../components/layout/container/Container";
import styles from "./Payment.module.scss";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { uid } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchData = async () => {
      console.log(data);
      setLoading(true);
      try {
        // dashboard 컬렉션에서 사용자 ID로 필터링합니다.
        const dashboardQuery = query(
          collection(db, "dashboard"),
          where("userDocId", "==", uid)
        );
        const dashboardSnapshot = await getDocs(dashboardQuery);

        // 결제 정보를 배열로 변환합니다.
        const resultData = dashboardSnapshot.docs.map((doc) => ({
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

  // 관리자가 아닌 경우 자신의 데이터를 필터링
  const filteredData = data.filter((item) => item.userDocId === uid);

  return (
    <Container className={styles.container}>
      <div className={styles.payment}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filteredData.length > 0 ? (
              <table>
                <thead className={styles.thead}>
                  <tr>
                    <th>작물 종류</th>
                    <th>농장 종류</th>
                    <th>주문번호</th>
                    <th>승인 여부</th>
                    <th>자세히 보기</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.crop}</td>
                        <td>{item.type}</td>
                        <td>{item.createdAt}</td>
                        <td>{item.useYn}</td>
                        <td>
                          <Link to={`/mypage/${item.imp_uid}`}>
                            <button className={styles.button}>
                              자세히 보기
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
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
