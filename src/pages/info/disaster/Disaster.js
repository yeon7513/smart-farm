import React, { useEffect, useState } from "react";
import styles from "./Disaster.module.scss";
import DisasterList from "./disaster-list/DisasterList";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import DisasterButton from "./disaster-button/DisasterButton";
import DisasterItem from "./disasteritem/DisasterItem";
import { Outlet } from "react-router-dom";
import Writing from "./writing/Writing";
import PaginationButton from "../../../components/pagination-button/PaginationButton";

function Disaster(props) {
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [totalPages, setTotalPages] = useState(3); //전체페이지수
  const [itemsPerPage] = useState(5); //페이지당 게시글 수

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchDataForPage = async () => {
      console.log(`Fetching data for page: ${currentPage}`);
    };
    fetchDataForPage();
  }, [currentPage]);
  return (
    <div className={styles.main}>
      <div className={styles.list}>
        <DisasterItem />
        {/* <Outlet /> */}
        <ul>
          <DisasterList currentPage={currentPage} itemsPerPage={itemsPerPage} />
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
