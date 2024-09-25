import React, { useDeferredValue, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../../components/search_box/SearchBox";
import styles from "./DisasterList.module.scss";
import { Link } from "react-router-dom";
// import { getDatas, incrementViewCount } from "../../../../api/firebase";
// import { incrementPostCount } from "../../../../api/board";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDisasterDatas,
  incrementViewCount,
} from "../../../../store/disaster/disasterSlice";

function DisasterList(props) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);

  useEffect(() => {
    dispatch(fetchDisasterDatas("disasters"));
  }, [dispatch]);
  return (
    <>
      {/* <div> */}
      <SearchBox
        placeholder={"검색어를 입력해주세요."}
        name={
          <>
            <CiSearch /> 조회
          </>
        }
      />

      {/* </div> */}

      <div className={styles.menu}>
        <div className={styles.menu_bar}>
          <div className={styles.menu_number}>
            <p>NO.</p>
          </div>
          <div className={styles.title}>
            <p>제목</p>
          </div>
          <div className={styles.name}>
            <p>작성자</p>
          </div>
          <div className={styles.check}>
            <p>작성일</p>
          </div>
          <div className={styles.check}>
            <p>조회수</p>
          </div>
        </div>
        <div>
          {posts.map((item, idx) => (
            <li key={idx} item={item}>
              <Link
                to={`/info/disaster/${item.docId}`}
                // state={{ docId: item.docId }}
              >
                <div className={styles.menu_list}>
                  <div className={styles.menu_number}>
                    <p>{item.id}</p>
                  </div>
                  <div className={styles.title}>
                    <p>{item.title}</p>
                  </div>

                  <div className={styles.name}>관리자</div>

                  <div className={styles.date}>
                    <p>{item.createdAt}</p>
                  </div>
                  <div className={styles.check}>
                    <p>{item.view || 0}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default DisasterList;
