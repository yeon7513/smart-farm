import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import CustomMaps from '../../components/map/CustomMaps';
import { useComponentContext } from '../../context/ComponentContext';
import { fetchCommonInfo } from '../../store/dashboard/dashboardSlice';
import FarmList from './my-farm-list/FarmList';
import styles from './MyFarm.module.scss';

function MyFarm() {
  const { currComp } = useComponentContext();
  const { commonInfo } = useSelector((state) => state.dashboardSlice);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommonInfo('dashboard'));

    // // 견적을 가져오는 함수입니다.
    // const fetchDashboardData = async () => {
    //   // 로그인 되어있는 사용자의 uid를 가져옵니다.
    //   const uid = JSON.parse(localStorage.getItem("user"))?.uid;

    //   if (!uid) return;

    //   try {
    //     const q = query(
    //       collection(db, "dashboard"),
    //       where("docId", "==", uid) // docId가 현재 로그인된 사용자 docId와 일치하는 조건
    //     );
    //     const querySnapshot = await getDocs(q);

    //     if (querySnapshot.empty) {
    //       console.log("일치하는 데이터를 찾을 수 없습니다.");
    //     } else {
    //       const data = querySnapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         ...doc.data(),
    //       }));
    //       console.log("Dashboard Data: ", data);
    //     }
    //   } catch (error) {
    //     console.error("데이터를 불러오는 데 실패했습니다.: ", error);
    //   }
    // };

    // fetchDashboardData();
  }, [dispatch]);

  return (
    <Container className={styles.myFarm}>
      <div className={styles.map}>
        {commonInfo.latitude && commonInfo.longitude ? (
          <CustomMaps lat={commonInfo.latitude} lng={commonInfo.longitude} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={styles.content}>
        <Outlet />
        {currComp && location.pathname !== '/my-farm' ? (
          <Link to="details">
            <FarmList />
          </Link>
        ) : null}
      </div>
    </Container>
  );
}

export default MyFarm;
