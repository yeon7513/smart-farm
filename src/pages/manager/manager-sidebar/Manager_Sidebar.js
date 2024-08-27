import React from "react";
import { Link } from "react-router-dom";
import styles from "./Manager_Sidebar.module.scss";

function Manager_Sidebar(props) {
  return (
    <div className={styles.sidebar}>
      <nav>
        <div>
          {/* 1.회원관리 */}
          <div>
            <h3>회원관리</h3>
            <button>
              <span>열기</span>
            </button>
          </div>
          <ul>
            <li>
              <Link>회원 목록 조회</Link>
            </li>
            <li>
              <Link>회원이 신청한 견적 조회</Link>
            </li>
            <li>
              <Link>검토 후 설치 비용 안내 후 승인</Link>
            </li>
            <li>
              <Link>대시보드 접근</Link>
            </li>
            <li>
              <Link>회원 수정</Link>
            </li>
          </ul>
          {/* 2.회원이 신청한 견적조회 */}
        </div>
      </nav>
    </div>
  );
}

export default Manager_Sidebar;
