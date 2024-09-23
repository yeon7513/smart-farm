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

  let db;
  let request = indexedDB.open("MyDatabase", 1);

  // 데이터베이스 업그레이드가 필요할 때 호출
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    let objectStore = db.createObjectStore("items", {
      keyPath: "indexId",
      autoIncrement: true,
    });
    objectStore.createIndex("name", "name", { unique: false });
    console.log("ObjectStore created or upgraded");
  };

  // 데이터베이스가 성공적으로 열렸을 때 호출
  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database opened successfully");

    // 배열 형태의 데이터를 추가하는 함수 호출
    addItem(item);
  };

  // 데이터베이스가 열리지 않으면 에러 처리
  request.onerror = function (event) {
    console.log("Error opening database: ", event.target.errorCode);
  };

  // 데이터를 추가하는 함수 (배열로 처리)
  function addItem(items) {
    // 트랜잭션 생성
    let transaction = db.transaction(["items"], "readwrite");

    // ObjectStore 참조
    let objectStore = transaction.objectStore("items");

    // 배열을 순회하며 각 객체를 추가
    items.forEach((item) => {
      let request = objectStore.add(item);
      request.onsuccess = function () {
        console.log("Item added: ", item);
      };
      request.onerror = function () {
        console.log("Error adding item: ", request.error);
      };
    });
  }

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
