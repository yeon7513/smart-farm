import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Container from '../../../../components/layout/container/Container';
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
  const { setCurrComp } = useComponentContext();
  const dispatch = useDispatch();

  const { setSector } = useSectorContext();

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
    <Container className={styles.wrapper}>
      <div className={styles.dashBoard}>
        <DashboardHeader info={state} />
        <div className={styles.content}>
          <DashboardNav />
          <DashboardContent docId={state.docId} />
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
