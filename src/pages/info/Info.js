import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Title from '../../components/layout/title/Title';
import { useComponentContext } from '../../context/ComponentContext';
import { infoTitle } from '../../lib/intro';
import styles from './Info.module.scss';

function Info() {
  const { currComp, setCurrComp } = useComponentContext();
  const navigate = useNavigate();

  const titleProps = infoTitle[currComp] || infoTitle.UsageStatus;

  const handleChangeTitles = (compName) => {
    setCurrComp(compName);
    navigate('/info');
  };

  return (
    <>
      <Title {...titleProps} />
      <Container className={styles.container}>
        <ul className={styles.links}>
          <li>
            <button
              className={currComp === 'UsageStatus' ? styles.active : ''}
              onClick={() => handleChangeTitles('UsageStatus')}
            >
              이용현황
            </button>
          </li>
          <li>
            <button
              className={currComp === 'Simulation' ? styles.active : ''}
              onClick={() => handleChangeTitles('Simulation')}
            >
              시뮬레이션
            </button>
          </li>
          <li>
            <button
              className={currComp === 'Diseases' ? styles.active : ''}
              onClick={() => handleChangeTitles('Diseases')}
            >
              병해충 정보
            </button>
          </li>
          <li>
            <button
              className={currComp === 'Disaster' ? styles.active : ''}
              onClick={() => handleChangeTitles('Disaster')}
            >
              자연재해 정보
            </button>
          </li>
        </ul>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Container>
    </>
  );
}

export default Info;
