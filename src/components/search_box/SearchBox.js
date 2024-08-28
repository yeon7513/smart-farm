import React from "react";
import styles from "./SearchBox.module.scss";
import { CiSearch } from "react-icons/ci";
function SearchBox(props) {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="검색어를 입력해주세요." />
      <button>
        <CiSearch /> 조회
      </button>
    </div>
  );
}

export default SearchBox;
