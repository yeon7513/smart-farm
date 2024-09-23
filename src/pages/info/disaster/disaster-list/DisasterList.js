import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../../components/search_box/SearchBox";
import styles from "./DisasterList.module.scss";
import { Link } from "react-router-dom";
import Writing from "../writing/Writing";
import { getDatas } from "../../../../api/firebase";

// const post = [
//   {
//     id: 1,
//     title: "2020년 농작물 폭염",
//     name: "관리자",
//     dat: "2020.01.13",
//     views: 23,
//   },
//   {
//     id: 2,
//     title: "2020년 농작물 폭염",
//     name: "관리자",
//     dat: "2020.01.23",
//     views: 25,
//   },

//   {
//     id: 3,
//     title: "2020년 농작물 폭염",
//     name: "관리자",
//     dat: "2020.01.23",
//     views: 25,
//   },
//   {
//     id: 4,
//     title: "2020년 농작물 폭염",
//     name: "관리자",
//     dat: "2020.01.23",
//     views: 25,
//   },
// ];

function DisasterList(props) {
  const [posts, setPosts] = useState([]); //상태관리

  //컴포넌트가 마운트되었을때 Firestore에서 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getDatas("disasters");
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchPosts();
  }, []);
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
              <Link to={`/info/disaster/${item.id}`}>
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
                    <p>{item.views}</p>
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
