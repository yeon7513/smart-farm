import React, { useEffect, useState } from "react";
import { useSectorContext } from "../../../../../../context/SectorContext";
import { renameOptions } from "../../../../../../utils/renameOptions";
import ControlItem from "./control-item/ControlItem";
import Briefing from "../briefing/Briefing";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../../../../store/controlData/controSlice";

// function ControlBox() {
//   const { sector } = useSectorContext();
//   const [movedData, setMovedData] = useState([]);
//   const { item } = useSelector((state) => state.controlSlice);
//   const dispatch = useDispatch();
//   const filteredOptions = Object.entries(sector.control)
//     .filter(([key, value]) => value === "Y")
//     .map(([key, vlaue]) => renameOptions(key));

//   useEffect(() => {
//     dispatch(
//       setData({
//         Data: movedData,
//       })
//     );
//   }, [movedData]);
//   const handleMoveComponent = (data) => {
//     setMovedData((prevData) => [...prevData, data.option]);
//   };
//   return (
//     <>
//       <div>
//         {filteredOptions.map((option, idx) => (
//           <ControlItem
//             key={idx}
//             idx={idx}
//             option={option}
//             onMoveComponent={handleMoveComponent}
//           />
//         ))}
//       </div>
//       <Briefing option={movedData} />
//     </>
//   );
// }

// export default ControlBox;
function ControlBox() {
  const { sector } = useSectorContext();
  const [movedData, setMovedData] = useState([]);
  const { item } = useSelector((state) => state.controlSlice);
  const dispatch = useDispatch();

  const filteredOptions = Object.entries(sector.control)
    .filter(([key, value]) => value === "Y")
    .map(([key, value]) => renameOptions(key));

  useEffect(() => {
    dispatch(
      setData({
        Data: movedData,
      })
    );
  }, [movedData, dispatch]);

  const handleMoveComponent = (data) => {
    setMovedData((prevData) => {
      // 데이터가 이미 배열에 있는지 확인하고 없으면 추가
      if (!prevData.includes(data.option)) {
        return [...prevData, data.option];
      }
      return prevData;
    });
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
          />
        ))}
      </div>
      <Briefing option={movedData} />
    </>
  );
}
export default ControlBox;
