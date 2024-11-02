import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../../api/firebase";
import Container from "../../../components/layout/container/Container";
import styles from "./Payment.module.scss";
import PaginationButton from "../../../components/pagination-button/PaginationButton";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { uid } = useSelector((state) => state.userSlice);
  const [filteredData, setFilteredData] = useState([]);

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [itemsPerPage] = useState(5); // 페이지당 게시글 수

  // 각 버튼 클릭 시 호출될 함수 (필터링)
  const filterData = (status) => {
    let filtered;
    if (status === "pending") {
      filtered = data.filter(
        (item) => item.useYn === "N" && item.deleteYn === "N"
      );
    } else if (status === "approved") {
      filtered = data.filter(
        (item) => item.useYn === "Y" && item.deleteYn === "N"
      );
    } else if (status === "rejected") {
      filtered = data.filter(
        (item) => item.useYn === "N" && item.deleteYn === "Y"
      );
    } else {
      filtered = data; // 전체 내역
    }
    setFilteredData(filtered);
    setCurrentPage(1); // 필터링하면 첫 페이지로 이동
  };

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dashboardQuery = query(
          collection(db, "dashboard"),
          where("userDocId", "==", uid)
        );
        const dashboardSnapshot = await getDocs(dashboardQuery);
        const resultData = dashboardSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(resultData);
        setFilteredData(resultData); // 전체 데이터로 초기 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    if (uid) {
      fetchData();
    }
  }, [uid]);

  // 페이지네이션에 맞춰 현재 페이지에 보여줄 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Container className={styles.container}>
      <div className={styles.payment}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* 필터링 옵션 */}
            <select onChange={(e) => filterData(e.target.value)}>
              <option value="all">전체</option>
              <option value="pending">대기</option>
              <option value="approved">승인</option>
              <option value="rejected">거절</option>
            </select>

            {/* 필터링된 데이터가 있으면 테이블에 표시 */}
            {currentItems.length > 0 ? (
              <table>
                <thead className={styles.thead}>
                  <tr>
                    <th>작물 종류</th>
                    <th>농장 종류</th>
                    <th>주문번호</th>
                    <th>결제 날짜</th>
                    <th>승인 여부</th>
                    <th>자세히 보기</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => {
                    let approvalStatus;
                    if (item.useYn === "Y" && item.deleteYn === "N") {
                      approvalStatus = "승인";
                    } else if (item.deleteYn === "Y" && item.useYn === "N") {
                      approvalStatus = "거절";
                    } else {
                      approvalStatus = "대기";
                    }
                    return (
                      <tr key={item.id} className={styles.item}>
                        <td>{item.crop}</td>
                        <td>{item.type}</td>
                        <td>{item.createdAt}</td>
                        <td>
                          {new Date(item.createdAt).toLocaleDateString("ko-KR")}
                        </td>
                        <td>{approvalStatus}</td>
                        <td>
                          <Link to={`/mypage/${item.paymentsDocId}`}>
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
              <p>결제 내역이 없습니다.</p>
            )}
          </>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <PaginationButton
          currentPage={currentPage}
          totalPage={totalPages}
          onPageChange={(page) => setCurrentPage(page)} // 페이지 변경
        />
      </div>
    </Container>
  );
};

export default Payment;
