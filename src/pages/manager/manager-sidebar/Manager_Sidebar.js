import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Manager_Sidebar.module.scss";
import down from "../../../assets/arrow/down.png";
import up from "../../../assets/arrow/up.png";

function Manager_Sidebar(props) {
  const [openIds, setOpenIds] = useState([]);

  // up, down버튼 클릭에 따라 description(내용) 표시 여부를 변경합니다.
  const toggleVisibility = (id) => {
    setOpenIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((openId) => openId !== id)
        : [...prevIds, id]
    );
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>회원관리</h3>
          {openIds.includes(1) ? (
            <button onClick={() => toggleVisibility(1)}>
              <img src={up} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(1)}>
              <img src={down} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openIds.includes(1) && (
          <div className={styles.description}>
            <ul>
              <li>
                <Link>회원 목록 조회</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>공지사항 관리</h3>
          {openIds.includes(2) ? (
            <button onClick={() => toggleVisibility(2)}>
              <img src={up} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(2)}>
              <img src={down} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openIds.includes(2) && (
          <div className={styles.description}>
            <ul>
              <li>
                <Link>공지사항 등록</Link>
              </li>
              <li>
                <Link>공지사항 수정</Link>
              </li>
              <li>
                <Link>공지사항 삭제</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 나머지 FAQ들도 동일한 방식으로 수정 */}
      {/* FAQ 관리 */}
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>FAQ 관리</h3>
          {openIds.includes(3) ? (
            <button onClick={() => toggleVisibility(3)}>
              <img src={up} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(3)}>
              <img src={down} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openIds.includes(3) && (
          <div className={styles.description}>
            <ul>
              <li>
                <Link>자주묻는 질문등록</Link>
              </li>
              <li>
                <Link>자주묻는 질문 수정</Link>
              </li>
              <li>
                <Link>자주묻는 질문 삭제</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 정보 공유 게시판 관리 */}
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>정보 공유 게시판 관리</h3>
          {openIds.includes(4) ? (
            <button onClick={() => toggleVisibility(4)}>
              <img src={up} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(4)}>
              <img src={down} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openIds.includes(4) && (
          <div className={styles.description}>
            <ul>
              <li>
                <Link>신고된 게시판 알림확인</Link>
              </li>
              <li>
                <Link>신고된 게시판 삭제</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3>A/S 문의 게시판 관리</h3>
          {openIds.includes(5) ? (
            <button onClick={() => toggleVisibility(5)}>
              <img src={up} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(5)}>
              <img src={down} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openIds.includes(5) && (
          <div className={styles.description}>
            <ul>
              <li>
                <Link>신규 문의사항 알림 확인</Link>
              </li>
              <li>
                <Link>문의사항 조회</Link>
              </li>
              <li>
                <Link>문의사항 답변</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.faq}>
        <div className={styles.title}>
          <h3> 챗봇 상담</h3>
          {openIds.includes(6) ? (
            <button onClick={() => toggleVisibility(6)}>
              <img src={up} alt="자세히 보기" />
            </button>
          ) : (
            <button onClick={() => toggleVisibility(6)}>
              <img src={down} alt="간략히 보기" />
            </button>
          )}
        </div>
        {openIds.includes(6) && (
          <div className={styles.description}>
            <ul>
              <li>
                <Link>신규 챗봇 상담 알림 확인</Link>
              </li>
              <li>
                <Link>챗봇 상담 조회</Link>
              </li>
              <li>
                <Link>챗봇 상담 답변</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* 다른 항목들도 동일하게 설정 */}
    </div>
  );
}

export default Manager_Sidebar;
