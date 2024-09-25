import React from 'react';
import styles from './PaginationButton.module.scss';

function PaginationButton({ totalPage, currentPage, onPageChange }) {
  // 전체 페이지만큼 버튼 렌더링
  const renderBtns = () => {
    const buttons = [];

    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return <div className={styles.pageNumber}>{renderBtns()}</div>;
}

export default PaginationButton;
