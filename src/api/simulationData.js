import axios from 'axios';

const apiKey = process.env.REACT_APP_BEST_FARM_API_KEY;

export const bestFarmInfo = async (type, query) => {
  const URL = `/bestfarm/${type}?serviceKey=${apiKey}&${query}&returnType=json`;

  try {
    const response = await axios.get(URL);
    return response.data.response.body.items.item;
  } catch (error) {
    console.error(error);

    if (error.response) {
      // 서버가 응답을 반환했을 경우
      console.error('Response data:', error.response.data); // 응답 데이터
      console.error('Response status:', error.response.status); // 상태 코드
      console.error('Response headers:', error.response.headers); // 헤더
    } else if (error.request) {
      // 요청이 이루어졌지만 응답을 받지 못했을 경우
      console.error('Request data:', error.request);
    } else {
      // 오류를 발생시킨 요청 설정
      console.error('Error config:', error.config);
    }
  }
};

// 우수농가 데이터 평균값
export function formatData(data, fields) {
  const totals = {};

  fields.forEach((field) => {
    totals[field] = 0;
  });

  data.forEach((item) => {
    fields.forEach((field) => {
      totals[field] += item[field] || 0;
    });
  });

  const averages = {};
  const length = data.length || 1;

  fields.forEach((field) => {
    averages[field] = Math.ceil(totals[field]) / length;
  });

  return { averages };
}

// 구간 설정
const createRange = (data) => {
  const ranges = [];

  for (const [key, value] of Object.entries(data)) {
    const min = Math.min(...value);
    const max = Math.max(...value);
    const step = (max - min) / 5; // 5개의 구간으로 나누기
    ranges[key] = [];

    for (let i = 0; i < 5; i++) {
      const rangeMin = (min + step * i).toFixed(2);
      const rangeMax = (min + step * (i + 1)).toFixed(2);
      let count;

      // count 값 설정
      if (i === 0 || i === 4) {
        count = -3; // 첫 번째와 마지막 구간
      } else if (i === 1 || i === 3) {
        count = -2; // 두 번째와 네 번째 구간
      } else if (i === 2) {
        count = -1; // 세 번째 구간
      }

      const rangeLabel =
        i === 0
          ? `${rangeMin} 이하`
          : i === 4
          ? `${rangeMax} 이상`
          : `${rangeMin} ~ ${rangeMax}`;

      ranges[key].push({ range: rangeLabel, count });
    }
  }

  return ranges;
};

// 결과 출력
export function calcResult(prodPerArea, selectObj) {
  const { count, area } = selectObj;
}
