import React, { useEffect, useState } from "react";
import ControlItem from "../control-box/control-item/ControlItem";
import { useSelector } from "react-redux";
import { renameOptions } from "../../../../../../utils/renameOptions";
import { useSectorContext } from "../../../../../../context/SectorContext";

function Briefing() {
  // const { sector } = useSectorContext();
  // const { item } = useSelector((state) => state.controlSlice);
  // const [state, setState] = useState([]);
  // if (!sector || !sector.control) {
  //   return <div>Loading...</div>;
  // }
  // const filteredOptions = Object.entries(sector?.control)
  //   .filter(([key, value]) => value === "Y")
  //   .map(([key, vlaue]) => renameOptions(key));

  // const option = filteredOptions.filter((value) => {
  //   return value == item;
  // });
  // useEffect(() => {
  //   if (option) {
  //     setState(option);
  //   }
  // }, []);
  // return (
  //   <div>
  //     {/* {item.map((option, idx) => ( */}
  //     <ControlItem option={option} idx={option.idx} key={option.idx} />
  //     {/* ))} */}
  //   </div>
  // );
  const { sector } = useSectorContext();
  const { item } = useSelector((state) => state.controlSlice);
  const [state, setState] = useState([]);
  if (!sector || !sector.control) {
    return <div>Loading...</div>; // useEffect 이전에 early return이 있어야 함
  }

  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, value]) => renameOptions(key));

  const option = filteredOptions.filter((value) => value === item);
  console.log(option);
  // if (option) {
  //   setState(option);
  // }

  return (
    <div>
      <ControlItem option={option} idx={option.idx} key={option.idx} />
    </div>
  );
}

export default Briefing;
