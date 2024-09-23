import React, { useEffect, useState } from "react";
import { TbSettingsSearch } from "react-icons/tb";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./AfterServiceCare.module.scss";
import AsBoard from "../../../components/board/asBoard/AsBoard";
import {
  fetchCompleted,
  fetchCompleting,
} from "../../../store/as-service/AsServiceSlide";
import { useDispatch } from "react-redux";

function AfterServiceCare(props) {
  const [complete, setComplete] = useState("processing");
  const dispatch = useDispatch();

  // 처리별 렌더링
  const handleProcessClick = (selectedComplete) => {
    setComplete(selectedComplete);
  };

  useEffect(() => {
    dispatch(fetchCompleting(complete));
  }, [dispatch, complete]);

  useEffect(() => {
    dispatch(fetchCompleted(complete));
  }, [dispatch, complete]);

  return (
    <div className={styles.afterService}>
      <SearchBox name={<TbSettingsSearch />} placeholder={"A/S 검색"} />
      <div className={styles.header}>
        <div className={styles.state}>
          <div>
            <button onClick={() => handleProcessClick("completing")}>
              답변중
            </button>
            <button onClick={() => handleProcessClick("completed")}>
              답변완료
            </button>
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
