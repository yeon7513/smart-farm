import React, { useEffect, useState } from "react";
import { TbSettingsSearch } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "../../../components/search_box/SearchBox";
import {
  fetchCompleted,
  fetchCompleting,
} from "../../../store/as-service/asSlice";
import styles from "./AfterServiceCare.module.scss";
import AsCareItem from "./asItem/AsCareItem";

function AfterServiceCare(props) {
  const [complete, setComplete] = useState("completing");
  const dispatch = useDispatch();
  const { completing, completed } = useSelector((state) => state.asSlice);

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

  const filteredData = () => {
    const data = complete === "completing" ? completing : completed;
    return data;
  };

  // 검색
  const [searchValue, setSearchValue] = useState("");

  const filteredAs = filteredData().filter(
    (item) =>
      searchValue === "" ||
      item.summary.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nick.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleChangeSearchAs = (e) => {
    let value = !e.target[0] ? e.target.value : e.target[0].value;
    setSearchValue(value);
  };

  return (
    <div className={styles.afterService}>
      <SearchBox
        name={<TbSettingsSearch />}
        placeholder={"A/S 검색"}
        value={searchValue}
        onChange={handleChangeSearchAs}
      />
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
        <AsCareItem items={filteredAs} />
      </div>
    </div>
  );
}

export default AfterServiceCare;
