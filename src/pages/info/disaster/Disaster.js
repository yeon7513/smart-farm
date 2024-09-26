import React, { useState } from 'react';
import PaginationButton from '../../../components/pagination-button/PaginationButton';
import styles from './Disaster.module.scss';
import DisasterList from './disaster-list/DisasterList';
import DisasterItem from './disasteritem/DisasterItem';
import Writing from './writing/Writing';

function Disaster(props) {
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [totalPages, setTotalPages] = useState(1); //전체페이지수
  const [itemsPerPage] = useState(5); //페이지당 게시글 수

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateTotalPages = (totalPosts) => {
    // 총 게시글 수를 기반으로 페이지 수 계산
    setTotalPages(Math.ceil(totalPosts / itemsPerPage));
  };
  return (
    <div className={styles.main}>
      <div className={styles.list}>
        <DisasterItem />
        {/* <Outlet /> */}
        <ul>
          <DisasterList
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            updateTotalPages={updateTotalPages}
          />
        </ul>
        <Writing />
      </div>
      <div className={styles.pagination}>
        <PaginationButton
          currentPage={currentPage}
          totalPage={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Disaster;
