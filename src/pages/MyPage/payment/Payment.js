import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../../api/firebase";
import Container from "../../../components/layout/container/Container";
import styles from "./Payment.module.scss";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const { commonInfo } = useSelector((state) => state.dashboardSlice);
  const [data, setData] = useState([]);
  const { uid } = useSelector((state) => state.userSlice);
  const [filteredData, setFilteredData] = useState([]);

  // 각 버튼 클릭 시 호출될 함수
  const filterData = (status) => {
    if (status === "pending") {
      setFilteredData(
        data.filter((item) => item.useYn === "N" && item.deleteYn === "N")
      );
    } else if (status === "approved") {
      setFilteredData(
        data.filter((item) => item.useYn === "Y" && item.deleteYn === "N")
      );
    } else if (status === "rejected") {
      setFilteredData(
        data.filter((item) => item.useYn === "N" && item.deleteYn === "Y")
      );
    } else {
      setFilteredData(data); // 전체 내역
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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
        setFilteredData(resultData);
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
    <Container className={styles.container}>
      <div className={styles.payment}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <select onChange={(e) => filterData(e.target.value)}>
              <option value="all">전체</option>
              <option value="pending">대기</option>
              <option value="approved">승인</option>
              <option value="rejected">거절</option>
            </select>
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
                    let approvalStatus;
                    if (item.useYn === "Y" && item.deleteYn === "N") {
                      approvalStatus = "승인";
                    } else if (item.deleteYn === "Y" && item.useYn === "N") {
                      approvalStatus = "거절";
                    } else {
                      approvalStatus = "대기";
                    }
                    return (
                      <tr key={item.id}>
                        <td>{item.crop}</td>
                        <td>{item.type}</td>
                        <td>{item.createdAt}</td>
                        <td>{approvalStatus}</td>
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
