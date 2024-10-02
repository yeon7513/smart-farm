import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useComponentContext } from '../../../../context/ComponentContext';
import { useSectorContext } from '../../../../context/SectorContext';
import { resetSectorData } from '../../../../store/dashboard/dashboardSlice';
import DashboardContent from './dashboard-contents/DashboardContent';
import DashboardHeader from './dashboard-header/DashboardHeader';
import DashboardNav from './dashboard-nav/DashboardNav';
import styles from './DashBoard.module.scss';

function DashBoard() {
  const { state } = useLocation();
  const { resetSector } = useSelector((state) => state.dashboardSlice);
  const { items } = useSelector((state) => state.userSlice);

  const { setCurrComp } = useComponentContext();
  const { setSector } = useSectorContext();

  console.log(state);
  console.log('items: ', items);
  const isAdmin = JSON.parse(localStorage.getItem('user')).email.includes(
    'admin'
  );

  const filteredInfo = isAdmin
    ? items.find((item) =>
        item.email === state.userId
          ? {
              name: item.name,
              crop: state.crop,
              farmName: state.farmName,
              type: state.type,
            }
          : null
      )
    : state;

  const dispatch = useDispatch();

  useEffect(() => {
    const collectionName = `dashboard/${state.docId}/sector`;
    dispatch(resetSectorData(collectionName));
  }, [dispatch, state.docId]);

  useEffect(() => {
    setSector(resetSector);
    setCurrComp('Briefing');

    return () => {
      setSector(resetSector);
      setCurrComp('Briefing');
    };
  }, [resetSector, setSector, setCurrComp]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashBoard}>
        <DashboardHeader info={filteredInfo} />
        <div className={styles.content}>
          <DashboardNav />
          <DashboardContent docId={state.docId} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
