import cn from 'classnames';
import React from 'react';
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import styles from './PaginationButton.module.scss';

function PaginationButton({ totalPage, currentPage, onPageChange, className }) {
  // 전체 페이지만큼 버튼 렌더링
  const renderBtns = () => {
    const buttons = [];

    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          className={i === currentPage ? styles.active : ''}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className={cn(styles.pagination, className)}>
      <button
        className={styles.start}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <RiArrowLeftDoubleLine />
      </button>
      <button
        className={styles.before}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <RiArrowLeftSLine />
      </button>
      <div className={styles.pageNumber}>{renderBtns()}</div>
      <button
        className={styles.after}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPage}
      >
        <RiArrowRightSLine />
      </button>
      <button
        className={styles.end}
        onClick={() => onPageChange(totalPage)}
        disabled={currentPage === totalPage}
      >
        <RiArrowRightDoubleLine />
      </button>
    </div>
  );
}

export default PaginationButton;
