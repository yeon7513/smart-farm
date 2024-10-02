import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DBdeleteData } from '../../../../../../api/indexedDB';
import { useSectorContext } from '../../../../../../context/SectorContext';
import { renameOptionsKor } from '../../../../../../utils/renameOptions';
import ControlItem from '../control-box/control-item/ControlItem';
import styles from './Briefing.module.scss';

function Briefing() {
  const { sector } = useSectorContext();
  const { item } = useSelector((state) => state.controlSlice);
  const [someState, setSomeState] = useState([]);
  const [openDB, setOpenDB] = useState(null);

  // console.log(state);

  const filteredOptions = Object.entries(sector?.control || {})
    .filter(([key, value]) => value === 'Y')
    .map(([key, value]) => renameOptionsKor(key));

  let db;
  // 데이터베이스를 여는 함수
  function openDatabase() {
    let request = indexedDB.open('MyDatabase', 2);
    // Object Store 생성
    request.onupgradeneeded = function (event) {
      db = event.target.result;
      handleDeleteItem(db);
      if (!db.objectStoreNames.contains('myStore')) {
        db.createObjectStore('myStore', {
          keyPath: 'docId',
          autoIncrement: true,
        });
        console.log('Object Store 생성 완료');
      }
    };
    request.onsuccess = function (event) {
      db = event.target.result;
      setOpenDB(db);
      console.log('데이터베이스 열기 성공');
      // 데이터베이스가 열린 후, addUniqueData 함수를 호출
      addUniqueData(item);
    };
    request.onerror = function (event) {
      console.error('IndexedDB 열기 실패', event);
    };
  }
  function addUniqueData(item) {
    // 데이터베이스가 열려 있지 않은 경우 오류 처리
    if (!db) {
      console.error('데이터베이스가 열리지 않았습니다.');
      return;
    }
    // 트랜잭션 생성
    let transaction = db.transaction(['myStore'], 'readwrite');
    let store = transaction.objectStore('myStore');
    // 모든 데이터를 조회
    let getAllRequest = store.getAll();
    getAllRequest.onsuccess = function () {
      const existingData = getAllRequest.result; // 현재 저장된 데이터
      setSomeState(existingData);
    };
    getAllRequest.onerror = function () {
      console.error('데이터 조회 실패');
    };
  }

  const correctValue = someState.filter((data) => {
    return filteredOptions.includes(data.option) && data.id === sector.id;
  });
  const handleDeleteItem = (docId) => {
    if (openDB) {
      DBdeleteData(openDB, 'myStore', docId);
    } else {
      console.error('데이터베이스가 아직 열리지 않았습니다.');
    }
    setSomeState((prev) => prev.filter((data) => data.docId !== docId));
  };

  useEffect(() => {
    openDatabase();
  }, []);

  return (
    <>
      <div className={styles.controlContainer}>
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
