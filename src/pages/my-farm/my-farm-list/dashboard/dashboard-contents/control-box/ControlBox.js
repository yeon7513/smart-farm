import React, { useState } from "react";
import { useSectorContext } from "../../../../../../context/SectorContext";
import { renameOptions } from "../../../../../../utils/renameOptions";
import ControlItem from "./control-item/ControlItem";
import Briefing from "../briefing/Briefing";

function ControlBox() {
  const { sector } = useSectorContext();
  const [movedData, setMovedData] = useState("");

  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, vlaue]) => renameOptions(key));

  const handleMoveComponent = (data) => {
    setMovedData(data);
  };
  const itemData = [movedData];
  return (
    <div>
      {filteredOptions.map((option, idx) => (
        <ControlItem
          key={idx}
          idx={idx}
          option={option}
          onMoveComponent={handleMoveComponent}
        />
      ))}
      <Briefing
        movedData={movedData.option}
        idx={movedData.idx}
        key={movedData.idx}
      />
    </div>
  );
}

export default ControlBox;
