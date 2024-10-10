import React, { useEffect, useState } from "react";
import { useSectorContext } from "../../../../../../context/SectorContext";
import {
  getAllControlItems,
  saveControlItem,
} from "../../../../../../utils/indexedDB";
import ControlItem from "../control-box/control-item/ControlItem";
import styles from "./Briefing.module.scss";

function Briefing() {
  const { sector } = useSectorContext();
  const [selectedControls, setSelectedControls] = useState([]);

  const loadControlList = async () => {
    try {
      const list = await getAllControlItems();
      setSelectedControls(list);
    } catch (error) {
      console.error("indexedDB 로드 실패: ", error);
    }
  };

  useEffect(() => {
    loadControlList();
  }, []);

  const renderingControls =
    selectedControls.find((item) => item.id === sector.docId) || [];

  const handleRemoveControlItem = async (newItem) => {
    await saveControlItem(sector.docId, newItem);
    await loadControlList();
  };

  return (
    <>
      <div className={styles.controlContainer}>
        {renderingControls.length === 0 ? (
          ""
        ) : (
          <>
            {renderingControls.controlItems.map((control, idx) => {
              return control.isAdd ? (
                <ControlItem
                  key={idx}
                  idx={idx}
                  option={control.label}
                  category={control.category}
                  defaultChecked={control.on}
                  isAdd={control.isAdd}
                  setValue={control.set}
                  onUpdate={handleRemoveControlItem}
                />
              ) : null;
            })}
          </>
        )}
      </div>
    </>
  );
}
export default Briefing;
