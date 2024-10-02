import React, { useEffect, useState } from "react";
import { TbReportSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../../components/search_box/SearchBox";
import {
  fetchProcessed,
  fetchProcessing,
} from "../../../store/complain/complainSlice";
import styles from "./ComplaintsCare.module.scss";
import CpComment from "./part/CpComment";
import CpPost from "./part/CpPost";
import CpProfile from "./part/CpProfile";

function ComplaintsCare() {
  const [sort, setSort] = useState("all");
  const [process, setProcess] = useState("processing");
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const { processing, processed } = useSelector((state) => state.complainSlice);

  // 카테고리별 렌더링
  const handleSortClick = (selectedsort) => {
    setSort(selectedsort);
  };

  // 처리별 렌더링
  const handleProcessClick = (selectedprocess) => {
    setProcess(selectedprocess);
  };

  useEffect(() => {
    dispatch(fetchProcessing(process));
  }, [dispatch, process]);

  useEffect(() => {
    dispatch(fetchProcessed(process));
  }, [dispatch, process]);

  // 카테고리별 필터링된 데이터 가져오기
  const filteredData = (sort) => {
    const data = process === "processing" ? processing : processed;
    let filteredBySort = data;

    if (sort === "profile") {
      filteredBySort = data.filter(
        (item) => item.reasonCode && item.reasonCode.startsWith("pf")
      );
    } else if (sort === "post") {
      filteredBySort = data.filter(
        (item) => item.reasonCode && item.reasonCode.startsWith("ps")
      );
    } else if (sort === "comment") {
      filteredBySort = data.filter(
        (item) => item.reasonCode && item.reasonCode.startsWith("cm")
      );
    }

    // 검색어로 필터링
    return filteredBySort.filter(
      (item) =>
        searchValue === "" ||
        item.reasonName.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.complainant.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.defendant.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  // 검색
  const handleChangeSearchComplaint = (e) => {
    let value = !e.target[0] ? e.target.value : e.target[0].value;
    setSearchValue(value);
  };

  return (
    <div className={styles.complaints}>
      <SearchBox
        name={<TbReportSearch />}
        placeholder={"신고 검색"}
        value={searchValue}
        onChange={handleChangeSearchComplaint}
      />
      <div className={styles.header}>
        <div className={styles.state}>
          <div>
            <button onClick={() => handleProcessClick("processing")}>
              처리중
            </button>
            <button onClick={() => handleProcessClick("processed")}>
              처리완료
            </button>
          </div>
        </div>
        <div className={styles.category}>
          <div>
            <button
              className={sort === "all" ? styles.active : ""}
              onClick={() => handleSortClick("all")}
            >
              전체
            </button>
            <button
              className={sort === "profile" ? styles.active : ""}
              onClick={() => handleSortClick("profile")}
            >
              프로필
            </button>
            <button
              className={sort === "post" ? styles.active : ""}
              onClick={() => handleSortClick("post")}
            >
              게시글
            </button>
            <button
              className={sort === "comment" ? styles.active : ""}
              onClick={() => handleSortClick("comment")}
            >
              댓글
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div
          className={sort === "post" || sort === "comment" ? styles.hide : ""}
        >
          <h1>프로필</h1>
          <section>
            {filteredData("profile").map((items, idx) => {
              return <CpProfile key={idx} item={items} process={process} />;
            })}
          </section>
        </div>

        <div
          className={
            sort === "profile" || sort === "comment" ? styles.hide : ""
          }
        >
          <h1>게시글</h1>
          <section>
            {filteredData("post").map((items, idx) => {
              return <CpPost key={idx} item={items} process={process} />;
            })}
          </section>
        </div>

        <div
          className={sort === "profile" || sort === "post" ? styles.hide : ""}
        >
          <h1>댓글</h1>
          <section>
            {filteredData("comment").map((items, idx) => {
              return <CpComment key={idx} item={items} process={process} />;
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ComplaintsCare;
