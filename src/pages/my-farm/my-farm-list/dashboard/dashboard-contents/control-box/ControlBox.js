import React, { useEffect, useState } from "react";
import { useSectorContext } from "../../../../../../context/SectorContext";
import {
  getControlItem,
  saveControlItem,
} from "../../../../../../utils/indexedDB";
import {
  controlCategories,
  renameOptionsKor,
} from "../../../../../../utils/renameOptions";
import ControlItem from "./control-item/ControlItem";
import styles from "./ControlBox.module.scss";

function ControlBox() {
  const { sector } = useSectorContext();
  const [selectedControls, setSelectedControls] = useState([]);
  const isAdmin = JSON.parse(localStorage.getItem("user")).email.includes(
    "admin"
  );

  // 컨트롤 활성 옵션 필터링
  const filteredOptions = Object.entries(sector?.control || {})
    .filter(([key, value]) => (isAdmin ? true : value === "Y"))
    .map(([key, value]) => {
      // 카테고리 찾기
      const category = Object.keys(controlCategories).find((cat) =>
        controlCategories[cat].includes(renameOptionsKor(key))
      );

      return {
        label: renameOptionsKor(key),
        isDisabled: value === "N",
        category,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label, "ko-KR"));

  // indexedDB 호출
  const loadControlList = async () => {
    try {
      const list = await getControlItem(sector.docId);
      setSelectedControls(list);
    } catch (error) {
      console.error("indexedDB 로드 실패: ", error);
    }
  };

  // indexedDB 수정
  const handleUpdateControlItem = async (newItem) => {
    await saveControlItem(sector.docId, newItem);
    await loadControlList();
  };

  useEffect(() => {
    loadControlList();
  }, [sector.docId]);

  return (
    <>
      <div className={styles.control}>
        {filteredOptions.map((option, idx) => {
          const selectedControl = selectedControls.find(
            (control) => control.label === option.label
          );

          return (
            <ControlItem
              key={idx}
              idx={idx}
              docId={sector.docId}
              option={option.label}
              category={option.category}
              defaultChecked={selectedControl ? selectedControl.on : true}
              isAdd={selectedControl ? selectedControl.isAdd : false}
              setValue={selectedControl ? selectedControl.set : ""}
              className={option.isDisabled ? styles.disabled : ""}
              onUpdate={handleUpdateControlItem}
            />
          );
        })}
      </div>
    </>
  );
}

export default ControlBox;
