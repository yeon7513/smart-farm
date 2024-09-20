import React, { useEffect, useState } from "react";
import ControlItem from "../control-box/control-item/ControlItem";
import { useSelector } from "react-redux";
import { renameOptions } from "../../../../../../utils/renameOptions";
import { useSectorContext } from "../../../../../../context/SectorContext";

function Briefing() {
  const { sector } = useSectorContext();
  const { item } = useSelector((state) => state.controlSlice);
  const [deleteState, setDeleteState] = useState([]);
  const [someState, setSomeState] = useState();
  if (!sector || !sector.control) {
    return <div>Loading...</div>; // useEffect 이전에 early return이 있어야 함
  }

  const local = localStorage.getItem("movedData");
  const localResult = JSON.parse(local);

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

// // 1. 로컬 스토리지에서 데이터 가져오기
// const storedData = localStorage.getItem("keyName");
// let parsedData = JSON.parse(storedData); // JSON 객체로 변환

// // 2. 특정 객체 수정하기 위한 함수
// const updateObjectById = (targetId, newData) => {
//   const updatedData = parsedData.map((item) => {
//     if (item.id === targetId) {
//       // 수정할 객체를 찾기 위한 조건
//       return { ...item, ...newData }; // 새 데이터로 업데이트
//     }
//     return item; // 수정하지 않은 객체는 그대로 반환
//   });

//   // 3. 수정된 배열을 다시 로컬 스토리지에 저장
//   localStorage.setItem("keyName", JSON.stringify(updatedData));
// };

// // 사용 예시: id가 1인 객체를 수정
// updateObjectById(1, { option: "새로운 CCTV", idx: 2 });
