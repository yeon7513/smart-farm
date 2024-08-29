import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Title from '../../components/layout/title/Title';
import { useComponentContext } from '../../context/ComponentContext';
import { infoTitle } from '../../lib/intro';
import styles from './Info.module.scss';

function Info() {
  const { currComp, setCurrComp } = useComponentContext();

  const titleProps = infoTitle[currComp] || infoTitle.UsageStatus;

  const handleChangeTitles = (compName) => {
    setCurrComp(compName);
  };

  return (
    <>
      <Title {...titleProps} />
      <Container className={styles.container}>
        <ul className={styles.links}>
          <li>
            <button onClick={() => handleChangeTitles('UsageStatus')}>
              이용현황
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles('Simulation')}>
              시뮬레이션
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles('Diseases')}>
              병해충 상담
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles('Disaster')}>
              자연재해 상담
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
