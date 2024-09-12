import React from 'react';
import { useComponentContext } from '../../../context/ComponentContext';
import styles from './ManagerSidebar.module.scss';

function ManagerSidebar() {
  const { setCurrComp } = useComponentContext();

  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li>
          <button onClick={() => setCurrComp('OverallStatus')}>
            <span>전체 현황</span>
          </button>
        </li>
        <li>
          <button
            className={styles.active}
            onClick={() => setCurrComp('MembersCare')}
          >
            <span>회원 관리</span>
          </button>
        </li>
        <li>
          <button onClick={() => setCurrComp('QuotationsCare')}>
            견적 관리
          </button>
        </li>
        <li>
          <button onClick={() => setCurrComp('ComplaintsCare')}>
            신고 관리
          </button>
        </li>
        <li>
          <button onClick={() => setCurrComp('AfterServiceCare')}>
            A/S 관리
          </button>
        </li>
        <li>
          <button onClick={() => setCurrComp('ChatbotCare')}>챗봇 관리</button>
        </li>
      </ul>
    </div>
  );
}

export default ManagerSidebar;
