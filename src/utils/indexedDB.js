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
    request.onsuccess = () => resolve(request.result);
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
