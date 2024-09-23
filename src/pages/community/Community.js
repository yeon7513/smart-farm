import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import Title from '../../components/layout/title/Title';
import { useComponentContext } from '../../context/ComponentContext';
import { communityTitle } from '../../lib/intro';
import { communitySideMenu } from '../../lib/menu';
import styles from './community.module.scss';

function Community() {
  const { currComp, setCurrComp } = useComponentContext();
  const navigate = useNavigate();

  const titleProps = communityTitle[currComp] || communityTitle.Notice;

  const handleChangeTitles = (compName) => {
    setCurrComp(compName);
    navigate('/community');
  };

  return (
    <>
      <Title {...titleProps} />
      <Container className={styles.container}>
        <ul className={styles.links}>
          {communitySideMenu.map((menu) => (
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

export default Community;
