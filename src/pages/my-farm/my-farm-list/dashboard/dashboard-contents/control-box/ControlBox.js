import React, { useState } from "react";
import { useSectorContext } from "../../../../../../context/SectorContext";
import { renameOptions } from "../../../../../../utils/renameOptions";
import ControlItem from "./control-item/ControlItem";

function ControlBox() {
  const { sector } = useSectorContext();
  const [movedData, setMovedData] = useState(null);

  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, vlaue]) => renameOptions(key));

  const handleMoveComponent = (data) => {
    setMovedData(data);
  };

  return (
    <div>
      {filteredOptions.map((option, idx) => (
        <ControlItem key={idx} idx={idx} option={option} />
      ))}
    </div>
  );
}

export default ControlBox;
