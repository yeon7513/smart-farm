import cn from 'classnames';
import React from 'react';
import styles from './PaginationButton.module.scss';

function PaginationButton({ totalPage, currentPage, onPageChange, className }) {
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

  return (
    <div className={cn(styles.pageNumber, className)}>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        처음
      </button>
      {renderBtns()}
      <button
        onClick={() => onPageChange(totalPage)}
        disabled={currentPage === totalPage}
      >
        끝
      </button>
    </div>
  );
}

export default PaginationButton;
