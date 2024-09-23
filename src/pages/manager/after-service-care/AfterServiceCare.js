import React from "react";
import { TbSettingsSearch } from "react-icons/tb";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./AfterServiceCare.module.scss";
import AsBoard from "../../../components/board/asBoard/AsBoard";

function AfterServiceCare(props) {
  return (
    <div className={styles.afterService}>
      <SearchBox name={<TbSettingsSearch />} placeholder={"A/S 검색"} />
      <div className={styles.header}>
        <div className={styles.state}>
          <div>
            <button>답변중</button>
            <button>답변완료</button>
          </div>
        </div>
      </div>
      <div>
        <AsBoard nopost={false} />
      </div>
    </div>
  );
}

export default AfterServiceCare;
