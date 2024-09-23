import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSectorContext } from "../../../../../../context/SectorContext";
import { renameOptions } from "../../../../../../utils/renameOptions";
import ControlItem from "../control-box/control-item/ControlItem";

function Briefing() {
  const { sector } = useSectorContext();
  const { item } = useSelector((state) => state.controlSlice);
  const [deleteState, setDeleteState] = useState([]);
  const [someState, setSomeState] = useState();
  if (!sector || !sector.control) {
    return <div>Loading...</div>; // useEffect 이전에 early return이 있어야 함
  }

  const local = localStorage.getItem("movedData");
  const localResult = JSON.parse(local) || [];

  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, value]) => renameOptions(key));

  const correctValue = localResult.filter((data) =>
    filteredOptions.includes(data.option)
  );

  const result = deleteState.map((value, idx) => {
    return value;
  });
  const what = localResult.filter((items) => {
    return result.includes(items.option);
  });

  const realCorrectValue = correctValue.filter((data) => {
    return data.id === sector.id;
  });
  const handleDeleteItem = (option) => {
    const updatedData = localResult.map((item) => {
      if (item.option === option) {
        return { item: null };
      }
      return item; // 수정하지 않은 객체는 그대로 반환
    });
    localStorage.setItem("movedData", JSON.stringify(updatedData));
  };
  return (
    <div>
      {realCorrectValue.map((data, idx) => {
        return (
          <ControlItem
            option={data.option}
            key={idx}
            idx={idx}
            state={true}
            handleDeleteItem={handleDeleteItem}
          />
        );
      })}
    </div>
  );
}

export default Briefing;
