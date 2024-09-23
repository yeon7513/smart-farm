import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Title from '../../components/layout/title/Title';
import { useComponentContext } from '../../context/ComponentContext';
import { infoTitle } from '../../lib/intro';
import { infoSideMenu } from '../../lib/menu';
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
          {infoSideMenu.map((menu) => (
            <Sidebar
              key={menu.comp}
              comp={menu.comp}
              name={menu.name}
              handleClick={handleChangeTitles}
            />
          ))}
        </ul>
        <div className={styles.content}>
          <Outlet />
        </div>
      </Container>
    </>
  );
}

export default Info;
