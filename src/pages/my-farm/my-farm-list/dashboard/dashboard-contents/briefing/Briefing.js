import React, { useEffect, useState } from "react";
import ControlItem from "../control-box/control-item/ControlItem";
import { useSelector } from "react-redux";
import { renameOptions } from "../../../../../../utils/renameOptions";
import { useSectorContext } from "../../../../../../context/SectorContext";

function Briefing({}) {
  const { sector } = useSectorContext();
  const { item } = useSelector((state) => state.controlSlice);
  const [state, setState] = useState([]);
  const [itemState, setItemState] = useState();
  const { sectorInfo } = useSelector((state) => state.dashboardSlice);

  if (!sector || !sector.control) {
    return <div>Loading...</div>; // useEffect 이전에 early return이 있어야 함
  }

  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, value]) => renameOptions(key));

  const commonValues = filteredOptions.filter((value) => item.includes(value));
  console.log(commonValues);
  return (
    <div>
      {commonValues.map((option, idx) => {
        return <ControlItem option={option} />;
      })}
    </div>
  );
}

export default Briefing;
