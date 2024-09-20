import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useComponentContext } from "../../../../../context/ComponentContext";
import DashboardSector from "../dashboard-nav/dashboard-sector/DashboardSector";
import { fetchSectorInfo } from "./../../../../../store/dashboard/dashboardSlice";
import styles from "./DashboardContent.module.scss";

function DashboardContent({ docId }) {
  const { sectorInfo } = useSelector((state) => state.dashboardSlice);
  const { currComp } = useComponentContext();
  // const { setSector } = useSectorContext();

  const dispatch = useDispatch();
  console.log(sectorInfo);
  useEffect(() => {
    const collectionName = `dashboard/${docId}/sector`;
    dispatch(fetchSectorInfo(collectionName));
  }, [dispatch, docId]);

  return (
    <div className={styles.content}>
      <ul className={styles.sectorMenu}>
        {currComp !== "Alert" &&
          [...sectorInfo]
            .sort((a, b) => a.id - b.id)
            .map((sector) => (
              <DashboardSector
                key={sector.id}
                id={sector.id}
                data={sector}
                className={styles.sectorItem}
              />
            ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default DashboardContent;
