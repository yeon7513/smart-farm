import React, { useState } from "react";
import styles from "./Pagination.module.scss"; // module.scss로 import
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [startPage, setStartPage] = useState(1);
  const pageNumbers = [];

  const endPage = Math.min(startPage + 9, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleFirstPage = () => {
    setStartPage(1);
    onPageChange(1);
  };

  const handlePreviousSet = () => {
    const newStartPage = Math.max(startPage - 10, 1);
    setStartPage(newStartPage);
    onPageChange(newStartPage);
  };

  const handleNextSet = () => {
    const newStartPage = Math.min(startPage + 10, totalPages - 9);
    setStartPage(newStartPage);
    onPageChange(newStartPage);
  };

  const handleLastPage = () => {
    const newStartPage = totalPages - 9;
    setStartPage(newStartPage);
    onPageChange(totalPages);
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        {/* 첫 페이지로 이동 */}
        <li className={currentPage === 1 ? styles.disabled : ""}>
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            <RiArrowLeftDoubleLine />
          </button>
        </li>

        {/* 10페이지 이전으로 이동 */}
        <li className={currentPage <= 10 ? styles.disabled : ""}>
          <button
            onClick={handlePreviousSet}
            disabled={currentPage <= 10}
            className={styles.pageButton}
          >
            <GrFormPrevious />
          </button>
        </li>

        {/* 페이지 번호 표시 */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? styles.active : ""}
          >
            <button
              onClick={() => onPageChange(number)}
              className={styles.pageButton}
            >
              {number}
            </button>
          </li>
        ))}

        {/* 10페이지 이후로 이동 */}
        <li className={currentPage > totalPages - 10 ? styles.disabled : ""}>
          <button
            onClick={handleNextSet}
            disabled={currentPage > totalPages - 10}
            className={styles.pageButton}
          >
            <MdOutlineNavigateNext />
          </button>
        </li>

        {/* 마지막 페이지로 이동 */}
        <li className={currentPage === totalPages ? styles.disabled : ""}>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            <RiArrowRightDoubleLine />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
