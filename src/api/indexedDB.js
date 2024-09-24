export function DBupdateData(db, storeName, updatedData) {
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  // 기존 데이터를 수정하고 저장
  const request = store.put(updatedData); // 데이터는 기존 데이터와 동일한 키여야 합니다

  request.onsuccess = function () {
    console.log("데이터가 성공적으로 수정되었습니다.");
  };

  request.onerror = function () {
    console.error("데이터 수정에 실패했습니다.", request.error);
  };
}

export function DBdeleteData(db, storeName, key) {
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  // 키 값을 사용해 데이터 삭제
  const request = store.delete(key);

  request.onsuccess = function () {
    console.log("데이터가 성공적으로 삭제되었습니다.");
  };

  request.onerror = function () {
    console.error("데이터 삭제에 실패했습니다.", request.error);
  };
}
