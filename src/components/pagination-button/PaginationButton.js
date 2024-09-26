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
  // totalPage : 전체 페이지 길이 (페이지 사이즈)
  // currentPage : 현재 페이지
  // onPageChange : 페이지 넘기는 핸들러
  // className : 클래스 이름

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
      {/* 처음으로 */}
      <button
        className={styles.start}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <RiArrowLeftDoubleLine />
      </button>
      {/* 이전 페이지 */}
      <button
        className={styles.before}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <RiArrowLeftSLine />
      </button>
      {/* 페이지 나눈 숫자들 */}
      <div className={styles.pageNumber}>{renderBtns()}</div>
      {/* 다음 페이지 */}
      <button
        className={styles.after}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPage}
      >
        <RiArrowRightSLine />
      </button>
      {/* 마지막으로 */}
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
