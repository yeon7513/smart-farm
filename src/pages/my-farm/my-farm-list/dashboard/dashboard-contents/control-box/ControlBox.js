import React, { useEffect, useState } from "react";
import { useSectorContext } from "../../../../../../context/SectorContext";
import { renameOptions } from "../../../../../../utils/renameOptions";
import ControlItem from "./control-item/ControlItem";
import Briefing from "../briefing/Briefing";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../../../../store/controlData/controSlice";

function ControlBox() {
  const { sector } = useSectorContext();
  const { item } = useSelector((state) => state.controlSlice);
  const [movedData, setMovedData] = useState([]);
  const dispatch = useDispatch();
  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, vlaue]) => renameOptions(key));

  useEffect(() => {
    dispatch(
      setData({
        Data: movedData,
      })
    );
  }, [movedData]);
  const handleMoveComponent = (data) => {
    setMovedData((prevData) => [...prevData, data]);

    localStorage.setItem("movedData", JSON.stringify(movedData));
  };

  return (
    <>
      <div>
        {filteredOptions.map((option, idx) => (
          <ControlItem
            key={idx}
            idx={idx}
            option={option}
            onMoveComponent={handleMoveComponent}
            state={false}
          />
        ))}
      </div>
    </>
  );
}

export default ControlBox;
