import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AsBoard.module.scss";
import { useSelector } from "react-redux";
import { getBoardDatas } from "../../../api/firebase/board";
import AsPost from "./AsPost";
import CustomModal from "../../modal/CustomModal";
import PasswordModal from "../../modal/PasswordModal";

// const loginUser = JSON.parse(localStorage.getItem("user"));
const PAGE_SIZE = 10;

function AsBoard({ complain }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모드 상태
  const [view, setView] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  // const isAsBoard = category === "as";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const goView = () => setIsModalOpen(false);

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
    setView([...view, newPost]); // Also add to view
    setIsWriting(false); // 글쓰기 모드 종료
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
    setIsModalOpen(true);
  };

  const handlePasswordConfirm = (password) => {
    if (selectedPost && selectedPost.password === password) {
      setIsModalOpen(false);
      navigate(`/community/as/${selectedPost.id}`, { state: selectedPost });
      return true; // 비밀번호가 맞을 경우 true 반환
    }
    return false; // 비밀번호가 틀릴 경우 false 반환
  };

  return (
    <div className={styles.container}>
      {/* 글쓰기 모드 */}
      {isWriting ? (
        <AsPost onClick={notPosting} onSubmit={addPost} />
      ) : (
        <>
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

          <div className={styles.upload}>
            {<button onClick={handleWriteClick}>글쓰기</button>}
          </div>

          <CustomModal
            title={"신고하기"}
            btnName={"접수"}
            handleClose={closeModal}
            isOpen={isModalOpen}
            //  btnHandler={goComplain}
            className={styles.modal}
          >
            <PasswordModal />
          </CustomModal>
        </>
      )}
    </div>
  );
}

export default AsBoard;
