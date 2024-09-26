import axios from 'axios';
import {
  parseFirestoreFields,
  toFirestoreFields,
} from '../utils/firebaseTranslate';

const BASE_URL =
  'https://firestore/googleapis.com/v1/projects/ifarm-dd7b6/databases/(default)/documents';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'appication/json' },
});

function getResultData(response) {
  if (response.data.length > 0) {
    const result = response.data.map((data) => {
      return {
        ...parseFirestoreFields(data.document.fields),
        docId: data.document.name.split('/').pop(),
      };
    });
    return result;
  } else {
    return {
      ...parseFirestoreFields(response.data.fields),
      docId: response.data.name.split('/').pop(),
    };
  }
}

export async function getDatasRest(collectionName) {
  try {
    const response = await api.post(':runQuery', {
      structuredQuery: {
        from: [{ collectionId: collectionName }],
      },
    });
    return getResultData(response);
  } catch (error) {
    console.error('데이터 가져오기 오류: ', error);
  }
}

export async function getDataRest(url) {
  const response = await api.get(url);
  return getResultData(response);
}

export async function Rest(url, addObj) {
  try {
    await api.patch(url, { fields: toFirestoreFields(addObj) });
    return true;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDatasRest(url) {
  try {
    await api.delete(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteDatasRestBatch(url, dataArr) {
  try {
    for (const item of dataArr) {
      const response = await api.delete(`${url}${item.id}`);
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
