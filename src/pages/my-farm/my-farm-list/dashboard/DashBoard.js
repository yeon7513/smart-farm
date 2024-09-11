import React from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../../../../components/layout/container/Container';
import { SectorProvider } from '../../../../context/SectorContext';
import DashboardContent from './dashboard-contents/DashboardContent';
import DashboardHeader from './dashboard-header/DashboardHeader';
import DashboardNav from './dashboard-nav/DashboardNav';
import styles from './DashBoard.module.scss';

function DashBoard() {
  const { state } = useLocation();

  return (
    <SectorProvider>
      <Container className={styles.wrapper}>
        <div className={styles.dashBoard}>
          <DashboardHeader info={state} />
          <div className={styles.content}>
            <DashboardNav />
            <DashboardContent docId={state.docId} />
          </div>
        </div>
      </Container>
    </SectorProvider>
  );
}

export default DashBoard;
