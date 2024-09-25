import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../../components/search_box/SearchBox";
import styles from "./DisasterList.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasterDatas } from "../../../../store/disaster/disasterSlice";

function DisasterList(props) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);
  //검색어 입력상태와 검색 결과 상태 분리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색버튼 클릭 핸들러
  const onClick = () => {
    const search = searchTerm.trim().replace(/\s+/g, "").toLowerCase();
    if (search) {
      const filtered = posts.filter((post) => {
        const title = post.title
          ? post.title.replace(/\s+/g, "").toLowerCase()
          : "";
        return title.includes(search);
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    dispatch(fetchDisasterDatas("disasters"));
  }, [dispatch]);
  return (
    <>
      {/* 검색창 */}
      <SearchBox
        placeholder={"검색어를 입력해주세요."}
        name={
          <>
            <CiSearch /> 조회
          </>
        }
        value={searchTerm} // 검색어 상태 바인딩
        onChange={handleSearchChange} // 검색어 입력 핸들러 연결
        onClick={onClick}
      />

      {/* 게시글 목록 */}
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
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item, idx) => (
              <li key={idx} item={item}>
                <Link to={`/info/disaster/${item.docId}`}>
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
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default DisasterList;
