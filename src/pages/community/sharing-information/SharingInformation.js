import React from 'react';
import { Outlet } from 'react-router-dom';
import Board from '../../../components/board/Board';
import { useComponentContext } from '../../../context/ComponentContext';
import { sharing } from '../../../lib/post';
import styles from '../community.module.scss';

function SharingInformation(props) {
  const { currComp } = useComponentContext();

  console.log(currComp);

  return (
    <div>
      <h2 className={styles.community}>정보 공유 게시판</h2>
      <p> - 아이팜 회원님들의 정보 공유 게시판입니다.</p>
      <div>
        <Outlet />
        <Board items={sharing} />
      </div>
    </div>
  );
}

export default SharingInformation;
