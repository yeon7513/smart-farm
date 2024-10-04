import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBoardDatas } from "../../../api/board";
import CustomModal from "../../modal/CustomModal";
import PasswordModal from "../../modal/PasswordModal";
import styles from "./AsBoard.module.scss";
import AsPost from "./AsPost";
import SearchBox from "../../search_box/SearchBox";
import { TbSearch } from "react-icons/tb";

const PAGE_SIZE = 10;

function AsBoard({ nopost }) {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모드 상태
  const [view, setView] = useState([]);
  const inputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const goView = () => setIsModalOpen(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [inputPassword, setInputPassword] = useState("");

  const totalPages = Math.ceil(view.length / PAGE_SIZE);
  const currentItem = view.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const PreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const NextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const addPost = (newPost) => {
    setView([...view, newPost]);
    setIsWriting(false);
  };

  // 글쓰기 취소
  const notPosting = () => {
    setIsWriting(false);
  };

  const handleLoad = async () => {
    const data = await getBoardDatas("as");
    setView(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleWriteClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return setIsWriting(false);
    } else {
      setIsWriting(true); // 로그인된 경우에만 글쓰기 모드로 전환
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setErrorMessage("");

    if (loginUser?.nickname === "관리자") {
      // 관리자 모드일 경우 비밀번호 없이 바로 이동
      navigate(`/community/as/${post.id}`, { state: post });
    } else {
      // 일반 사용자일 경우 비밀번호 입력 모달 표시
      setIsModalOpen(true);
    }
  };

  const handlePasswordConfirm = () => {
    if (selectedPost && selectedPost.password === inputPassword) {
      setIsModalOpen(false);
      navigate(`/community/as/${selectedPost.id}`, { state: selectedPost });
    } else {
      setErrorMessage("⁎ 설정하신 암호가 틀립니다.");
      if (inputRef.current) {
        inputRef.current.focus();
        setInputPassword(""); // 틀린 비밀번호 입력 초기화
      }
    }
  };

  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearch = (e) => {
    let value = !e.target[0] ? e.target.value : e.target[0].value;
    setSearchValue(value);
  };

  return (
    <div className={styles.container}>
      {/* 글쓰기 모드 */}
      {isWriting ? (
        <AsPost onClick={notPosting} onSubmit={addPost} />
      ) : (
        <>
          <div className={styles.boardSearch}>
            <SearchBox
              className={styles.searchBox}
              name={<TbSearch />}
              placeholder={"검색"}
              value={searchValue}
              onChange={handleChangeSearch}
            />
          </div>
          <div className={styles.col}>
            <div>NO.</div>
            <div>제목</div>
            <div>작성자</div>
            <div>작성일</div>
            <div>조회수</div>
          </div>

          <div className={styles.board}>
            <ul>
              {currentItem.map((item, idx) => (
                <li
                  key={idx}
                  id={view.length - ((currentPage - 1) * PAGE_SIZE + idx)}
                  onClick={() => handlePostClick(item)}
                >
                  <div>{item.id}</div>
                  <div>{item.title}</div>
                  <div>{item.nick}</div>
                  <div>{item.createdAt}</div>
                  <div>{item.count}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.pagination}>
            <button
              onClick={PreviousPage}
              disabled={currentPage === 1} // 첫 페이지에서는 비활성화
            >
              &lt; 이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={NextPage}
              disabled={currentPage === totalPages} // 마지막 페이지에서는 비활성화
            >
              다음 &gt;
            </button>
          </div>

          {nopost === false
            ? ""
            : loginUser?.nickname !== "관리자" && (
                <div className={styles.upload}>
                  {<button onClick={handleWriteClick}>글쓰기</button>}
                </div>
              )}

          <CustomModal
            title={"게시글 열기"}
            btnName={"확인"}
            handleClose={closeModal}
            isOpen={isModalOpen}
            btnHandler={handlePasswordConfirm}
            className={styles.modal}
          >
            <PasswordModal
              inputRef={inputRef} // input 요소에 ref 전달
              password={inputPassword}
              onPasswordChange={setInputPassword}
              errorMessage={errorMessage}
            />
          </CustomModal>
        </>
      )}
    </div>
  );
}

export default AsBoard;
