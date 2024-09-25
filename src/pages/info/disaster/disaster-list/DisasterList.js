import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../../components/search_box/SearchBox";
import styles from "./DisasterList.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasterDatas } from "../../../../store/disaster/disasterSlice";
import { ScaleLoader } from "react-spinners";

function DisasterList(props) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);
  //검색어 입력상태와 검색 결과 상태 분리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isLoading, setIsLoading] = useState(true); //로딩

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색 버튼 클릭 핸들러
  const onClick = () => {
    filterPosts();
  };
  // enter키 입력 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      filterPosts();
    }
  };

  // 검색버튼 클릭 핸들러
  const filterPosts = () => {
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
    const loadData = () => {
      setIsLoading(true);
      dispatch(fetchDisasterDatas("disasters"));
      setIsLoading(false); // 데이터 로딩 후 로딩 종료
    };
    loadData();
  }, [dispatch]);

  // posts가 변경될 때마다 filteredPosts도 갱신
  useEffect(() => {
    setFilteredPosts(posts); // 초기 게시글 세팅
  }, [posts]); // posts 변경 시 실행
  return (
    <>
      {/* 로딩 중일 때 전체 게시판 UI */}
      {isLoading ? (
        <div className={styles.loader}>
          <ScaleLoader color="#36D7B7" />
        </div>
      ) : (
        <div className={styles.menu}>
          {/* 검색창 */}
          <SearchBox
            placeholder={"검색어를 입력해주세요."}
            name={
              <>
                <CiSearch /> 조회
              </>
            }
            value={searchTerm}
            onChange={handleSearchChange}
            onClick={onClick}
            onKeyDown={handleKeyDown}
          />
          {/* 게시글 목록 */}
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
      )}
    </>
  );
}

export default DisasterList;
