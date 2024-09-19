import React from "react";
import ControlItem from "../control-box/control-item/ControlItem";

function Briefing({ movedData, idx, key }) {
  // console.log(movedData.option);
  return (
    <div>
      <ControlItem option={movedData} idx={idx} key={key} />
    </div>
  );
}

export default Briefing;
