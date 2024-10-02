// indexedDB 열기
export const openDB = async () => {
  const request = indexedDB.open('MyDatabase', 2);

  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore('myStore', { keyPath: 'id' });
    };
  });
};

// indexedDB에 있는 하나의 데이터 불러오기
export const getControlItem = async (id) => {
  const db = await openDB();
  const transaction = db.transaction(['myStore'], 'readonly');
  const store = transaction.objectStore('myStore');
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result?.controlItems || []);
    request.onerror = () => reject(request.error);
  });
};

// indexedDB에 있는 모든 데이터 불러오기
export const getAllControlItems = async () => {
  const db = await openDB();

  const transaction = db.transaction(['myStore'], 'readonly');
  const store = transaction.objectStore('myStore');
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// indexedDB에 데이터 저장
export const saveControlItem = async (docId, newItem) => {
  const db = await openDB();

  const transaction = db.transaction(['myStore'], 'readwrite');
  const store = transaction.objectStore('myStore');

  const request = store.get(docId);

  return new Promise((resolve, reject) => {
    request.onsuccess = async () => {
      const data = request.result || { id: docId, controlItems: [] };

      const existingItemIndex = data.controlItems.findIndex(
        (item) => item.label === newItem.label
      );

      if (existingItemIndex >= 0) {
        data.controlItems[existingItemIndex] = newItem;
      } else {
        data.controlItems.push(newItem);
      }

      await store.put(data);
      resolve(data);
    };

    request.onerror = () => reject(request.error);
  });
};

// indexedDB에 데이터 삭제
export const deleteControlItem = async (docId, label) => {
  const db = await openDB();

  const transaction = db.transaction(['myStore'], 'readwrite');
  const store = transaction.objectStore('myStore');

  const request = store.get(docId);

  return new Promise((resolve, reject) => {
    request.onsuccess = async () => {
      const data = request.result;

      if (data) {
        data.controlItems = data.controlItems.filter(
          (item) => item.label !== label
        );
        await store.put(data); // 필터링 후 저장
        resolve(data);
      } else {
        reject('해당 문서를 찾을 수 없습니다.');
      }
    };

    request.onerror = () => reject(request.error);
  });
};
