import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSectorContext } from "../../../../../../context/SectorContext";
import ControlItem from "../control-box/control-item/ControlItem";
import { DBdeleteData } from "../../../../../../api/indexedDB";
import { useLocation } from "react-router-dom";
import {
  renameOptions,
  renameOptionsKor,
} from "../../../../../../utils/renameOptions";

function Briefing() {
  const { state } = useLocation();
  const { sector } = useSectorContext();
  const { item } = useSelector((state) => state.controlSlice);
  const [someState, setSomeState] = useState([]);
  const [docIdInfo, setDocIdInfo] = useState("");
  const [openDB, setOpenDB] = useState(null);
  const [count, setCount] = useState(0);

  const filteredOptions = Object.entries(sector?.control || {})
    .filter(([key, value]) => value === "Y")
    .map(([key, value]) => renameOptionsKor(key));

  let db;
  // 데이터베이스를 여는 함수
  function openDatabase() {
    let request = indexedDB.open("MyDatabase", 1);
    // Object Store 생성
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      handleDeleteItem(db);
      if (!db.objectStoreNames.contains("myStore")) {
        db.createObjectStore("myStore", {
          keyPath: "docId",
          autoIncrement: true,
        });
        console.log("Object Store 생성 완료");
      }
    };
    request.onsuccess = function (event) {
      db = event.target.result;
      setOpenDB(db);
      console.log("데이터베이스 열기 성공");
      // 데이터베이스가 열린 후, addUniqueData 함수를 호출
      addUniqueData(item);
    };
    request.onerror = function (event) {
      console.error("IndexedDB 열기 실패", event);
    };
  }
  function addUniqueData(item) {
    // 데이터베이스가 열려 있지 않은 경우 오류 처리
    if (!db) {
      console.error("데이터베이스가 열리지 않았습니다.");
      return;
    }
    // 트랜잭션 생성
    let transaction = db.transaction(["myStore"], "readwrite");
    let store = transaction.objectStore("myStore");
    // 모든 데이터를 조회
    let getAllRequest = store.getAll();
    getAllRequest.onsuccess = function () {
      const existingData = getAllRequest.result; // 현재 저장된 데이터
      setSomeState(existingData);
      // item의 각 item에 대해 중복 검사 후 추가
      item.forEach((item) => {
        // existingData에서 option 값이 같은 객체가 있는지 확인
        const isDuplicate = existingData.some(
          (existingItem) => existingItem.option === item.option
        );
        if (!isDuplicate) {
          // 중복이 아닐 경우 데이터 추가
          // store.add(item);
          console.log(`데이터 추가 성공: ${JSON.stringify(item)}`);
        } else {
          console.log(`중복된 데이터: ${item.option}은 이미 존재합니다.`);
        }
      });
    };
    getAllRequest.onerror = function () {
      console.error("데이터 조회 실패");
    };
  }

  const correctValue = someState.filter((data) => {
    return filteredOptions.includes(data.option) && data.id === sector.id;
  });

  const handleDeleteItem = (docId) => {
    if (openDB) {
      DBdeleteData(openDB, "myStore", docId);
    } else {
      console.error("데이터베이스가 아직 열리지 않았습니다.");
    }
    setSomeState((prev) => prev.filter((data) => data.docId !== docId));
  };

  useEffect(() => {
    openDatabase();
  }, []);

  return (
    <>
      <div>
        {correctValue?.map((data, idx) => {
          return (
            <ControlItem
              option={data.option}
              docId={data.docId}
              key={idx}
              idx={idx}
              state={true}
              handleDeleteItem={handleDeleteItem}
            />
          );
        })}
      </div>
    </>
  );
}
export default Briefing;
