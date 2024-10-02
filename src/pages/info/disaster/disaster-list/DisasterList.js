import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./DisasterList.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDisasterDatas } from "../../../../store/disaster/disasterSlice";
import { ScaleLoader } from "react-spinners";

function DisasterList({ currentPage, itemsPerPage, updateTotalPages }) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isLoading, setIsLoading] = useState(true);

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
    const search = searchTerm.trim().toLowerCase();
    if (search) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await dispatch(fetchDisasterDatas("disasters"));
      setIsLoading(false);
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredPosts(sortedPosts);
    updateTotalPages(sortedPosts.length);
  }, [posts, updateTotalPages]);

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
          <div className={styles.search}>
            <input
              type="text"
              placeholder={"검색어를 입력해주세요."}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={onClick}>
              <span>
                <CiSearch />
                조회
              </span>
            </button>
          </div>

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
                        <p>{filteredPosts.length - (indexOfFirstPost + idx)}</p>
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
