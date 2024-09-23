import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { db } from '../../../api/firebase';
import Container from '../../../components/layout/container/Container';
import styles from './Payment.module.scss';

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
          collection(db, 'payments'),
          where('uid', '==', uid)
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);

        // 결제 정보를 배열로 변환합니다.
        const resultData = paymentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(resultData);
      } catch (error) {
        console.error('Error fetching data:', error);
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
            {data.length > 0 ? (
              <table>
                <thead className={styles.thead}>
                  <tr>
                    <th>작물 종류</th>
                    <th>농장 종류</th>
                    <th>주문번호</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.cropType}</td>
                      <td>{item.facilityType}</td>
                      <td>{item.createdAt}</td>
                      <td>
                        <Link to={`/mypage/${item.createdAt}`} state={{ item }}>
                          <button className={styles.button}>자세히 보기</button>
                        </Link>
                      </td>
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
