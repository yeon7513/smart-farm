import React from "react";
import { TbSettingsSearch } from "react-icons/tb";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./AfterServiceCare.module.scss";
import AsBoard from "../../../components/board/asBoard/AsBoard";

function AfterServiceCare(props) {
  return (
    <div className={styles.afterService}>
      <SearchBox name={<TbSettingsSearch />} placeholder={"A/S 검색"} />
      AfterServiceCare
      <AsBoard nopost={false} />
    </div>
  );
}

export default AfterServiceCare;
