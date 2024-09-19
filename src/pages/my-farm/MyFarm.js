import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { convertAddressToGeocode } from '../../api/geocoding';
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
    const address = '서울특별시 종로구 사직로 161';

    const test = async () => {
      const result = await convertAddressToGeocode(address);
      if (result) {
        console.log(result.lat);
        console.log(result.lng);
      }
    };

    test();
  }, []);

  useEffect(() => {
    dispatch(fetchCommonInfo('dashboard'));
  }, [dispatch]);

  return (
    <Container className={styles.myFarm}>
      <div className={styles.map}>
        <CustomMaps lat={commonInfo.latitude} lng={commonInfo.longitude} />
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
