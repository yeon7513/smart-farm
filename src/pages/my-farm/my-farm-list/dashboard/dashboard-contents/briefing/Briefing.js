import React from "react";
import ControlItem from "../control-box/control-item/ControlItem";
import { useSelector } from "react-redux";

function Briefing() {
  const { item } = useSelector((state) => state.controlSlice);
  console.log(item);
  return (
    <div>
      {item.map((option, idx) => (
        <ControlItem option={option} idx={idx} key={idx} />
      ))}
    </div>
  );
}

export default Briefing;
