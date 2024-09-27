import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../../components/search_box/SearchBox";
import styles from "./DisasterList.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasterDatas } from "../../../../store/disaster/disasterSlice";
import { ScaleLoader } from "react-spinners";

function DisasterList({ currentPage, itemsPerPage, updateTotalPages }) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isLoading, setIsLoading] = useState(true); // 로딩

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    filterPosts();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      filterPosts();
    }
  };

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
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      dispatch(fetchDisasterDatas("disasters"));
      setIsLoading(false);
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      dispatch(fetchDisasterDatas("disasters"));
      setIsLoading(false); // 데이터 로딩 후 로딩 종료
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredPosts(sortedPosts); // 초기 게시글 세팅 (작성일 기준으로 정렬)
  }, [posts]);

  // 게시글이 변경될 때마다 필터링된 게시글 목록을 설정하고 페이지 수를 업데이트
  useEffect(() => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredPosts(sortedPosts);

    // 전체 게시글 수를 기반으로 페이지 수를 계산하고 부모 컴포넌트에 전달
    updateTotalPages(sortedPosts.length);
  }, [posts, updateTotalPages]);
  // 페이지 네이션을 위한 현재 페이지에 맞는 게시글만 필터링
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <ScaleLoader color="#36D7B7" />
        </div>
      ) : (
        <div className={styles.menu}>
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
          <div className={styles.posts_main}>
            {currentPosts.length > 0 ? (
              currentPosts.map((item, idx) => (
                <li key={item.docId} item={item}>
                  <Link to={`/info/disaster/${item.docId}`}>
                    <div className={styles.menu_list}>
                      <div className={styles.menu_number}>
                        <p>{filteredPosts.length - (indexOfFirstPost + idx)}</p>{" "}
                        {/* 번호 매기기 */}
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
