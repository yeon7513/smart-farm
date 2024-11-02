import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { BsChevronCompactRight } from 'react-icons/bs';
import { useComponentContext } from '../../../../../context/ComponentContext';
import styles from './DashboardNav.module.scss';

function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);

  const { currComp, setCurrComp } = useComponentContext();

  const handleNavOpenClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [currComp]);

  return (
    <div className={cn(styles.navWrap, isOpen ? styles.show : '')}>
      <button
        className={cn(styles.navToggleBtn, isOpen ? styles.on : '')}
        onClick={handleNavOpenClick}
      >
        <BsChevronCompactRight />
      </button>
      <ul className={styles.nav}>
        <li>
          <button
            className={currComp === 'Briefing' ? styles.active : ''}
            onClick={() => setCurrComp('Briefing')}
          >
            메인
          </button>
        </li>
        <li>
          <button
            className={currComp === 'Monitoring' ? styles.active : ''}
            onClick={() => setCurrComp('Monitoring')}
          >
            모니터링
          </button>
        </li>
        <li>
          <button
            className={currComp === 'ControlBox' ? styles.active : ''}
            onClick={() => setCurrComp('ControlBox')}
          >
            컨트롤
          </button>
        </li>

        <li>
          <button
            className={currComp === 'Alert' ? styles.active : ''}
            onClick={() => setCurrComp('Alert')}
          >
            <span>알림 내역</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DashboardNav;
