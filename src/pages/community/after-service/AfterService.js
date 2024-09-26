import React from 'react';
import { Outlet } from 'react-router-dom';
import AsBoard from '../../../components/board/asBoard/AsBoard';
import styles from '../community.module.scss';

function AfterService(props) {
  return (
    <div>
      <h2 className={styles.community}>A/S 문의</h2>
      <p>
        - 아이팜 서비스 이용 중 문의사항이 있다면 게시판 또는 상담전화, 채팅상담
        등을 이용해보세요.
      </p>
      <div>
        <AsBoard />
        <Outlet />
      </div>
    </div>
  );
}

export default AfterService;
