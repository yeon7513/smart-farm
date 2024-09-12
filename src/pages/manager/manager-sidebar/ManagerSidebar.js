import React from 'react';
import { useComponentContext } from '../../../context/ComponentContext';
import styles from './ManagerSidebar.module.scss';

function ManagerSidebar() {
  const { currComp, setCurrComp } = useComponentContext();

  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li>
          <button
            className={currComp === 'OverallStatus' ? styles.active : ''}
            onClick={() => setCurrComp('OverallStatus')}
          >
            전체 현황
          </button>
        </li>
        <li>
          <button
            className={currComp === 'MembersCare' ? styles.active : ''}
            onClick={() => setCurrComp('MembersCare')}
          >
            회원 관리
          </button>
        </li>
        <li>
          <button
            className={currComp === 'QuotationsCare' ? styles.active : ''}
            onClick={() => setCurrComp('QuotationsCare')}
          >
            견적 관리
          </button>
        </li>
        <li>
          <button
            className={currComp === 'ComplaintsCare' ? styles.active : ''}
            onClick={() => setCurrComp('ComplaintsCare')}
          >
            신고 관리
          </button>
        </li>
        <li>
          <button
            className={currComp === 'AfterServiceCare' ? styles.active : ''}
            onClick={() => setCurrComp('AfterServiceCare')}
          >
            A/S 관리
          </button>
        </li>
        <li>
          <button
            className={currComp === 'ChatbotCare' ? styles.active : ''}
            onClick={() => setCurrComp('ChatbotCare')}
          >
            챗봇 관리
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ManagerSidebar;
