import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../../components/search_box/SearchBox";
import styles from "./DisasterList.module.scss";
import { Link } from "react-router-dom";
import Writing from "../writing/Writing";
import { getDatas, incrementViewCount } from "../../../../api/firebase";

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
  // const handlePostClick = async (post) => {
  //   console.log("Post clicked:", post); // 확인용 로그 추가
  //   if (!post || !post.id) {
  //     console.error("Invalid post:", post);
  //     return; // 잘못된 포스트 처리
  //   }
  //   try {
  //     await incrementViewCount(post.id);
  //     // ...
  //   } catch (error) {
  //     console.error("Error updating view count: ", error);
  //   }
  // };

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
                to={`/info/disaster/${item.id}`}
                state={{ post: item }}
                // onClick={() => handlePostClick(item)}
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
                    <p>{item.views || 0}</p>
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
