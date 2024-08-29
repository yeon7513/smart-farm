import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Title from '../../components/layout/title/Title';
import { useComponentContext } from '../../context/ComponentContext';
import { communityTitle } from '../../lib/intro';
import styles from './community.module.scss';

function Community() {
  const { currComp, setCurrComp } = useComponentContext();

  const titleProps = communityTitle[currComp] || communityTitle.Notice;

  const handleChangeTitles = (compName) => {
    setCurrComp(compName);
  };

  return (
    <>
      <Title {...titleProps} />
      <Container className={styles.container}>
        <ul className={styles.links}>
          <li>
            <button onClick={() => handleChangeTitles('Notice')}>
              공지사항
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles('Faq')}>FAQ</button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles('SharingInformation')}>
              정보 공유
            </button>
          </li>
          <li>
            <button onClick={() => handleChangeTitles('AfterService')}>
              A/S 문의
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

export default Community;
