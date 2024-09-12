import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonInfo } from "../../../store/dashboard/dashboardSlice";
import styles from "./FarmList.module.scss";
import FarmListItem from "./my-farm-list-item/FarmListItem";

function FarmList() {
  const { commonInfo } = useSelector((state) => state.dashboardSlice);

  const dispatch = useDispatch();

  // const userEmail = JSON.parse(localStorage.getItem('user')).email;

  const list = commonInfo;
  //  userEmail.includes("admin")
  //   ? commonInfo
  //   : commonInfo.filter(
  //       (list) =>
  //         list.userId === userEmail &&
  //         list.useYn === "Y" &&
  //         list.deleteYn === "N"
  //     );

  useEffect(() => {
    dispatch(fetchCommonInfo("dashboard"));
  }, [dispatch]);

  return (
    <>
      <h2 className={styles.title}>농장 리스트</h2>
      <ul className={styles.list}>
        {list.map((item) => (
          <FarmListItem key={item.docId} farmData={item} />
        ))}
      </ul>
    </>
  );
}

export default FarmList;
