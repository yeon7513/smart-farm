import axios from "axios";

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
      console.error("Response data:", error.response.data); // 응답 데이터
      console.error("Response status:", error.response.status); // 상태 코드
      console.error("Response headers:", error.response.headers); // 헤더
    } else if (error.request) {
      // 요청이 이루어졌지만 응답을 받지 못했을 경우
      console.error("Request data:", error.request);
    } else {
      // 오류를 발생시킨 요청 설정
      console.error("Error config:", error.config);
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
export const createRange = (data) => {
  const ranges = [];

  for (const [key, value] of Object.entries(data)) {
    const rangeSize = (value / 5) * 0.1;
    const min = value - rangeSize;
    const max = value + rangeSize;
    const step = (max - min) / 5;

    const changeKey = (() => {
      switch (key) {
        case "acSlrdQy":
          return "누적 일사량";
        case "inCo2":
          return "주간 평균 잔존 CO2";
        case "inHd":
          return "주간 평균 내부 습도";
        case "inTp":
          return "주간 평균 내부 온도";
        default:
          return key;
      }
    })();

    const values = [];

    for (let i = 0; i < 5; i++) {
      const rangeMin = (min + step * i).toFixed(2);
      const rangeMax = (min + step * (i + 1)).toFixed(2);

      const count = i === 0 || i === 4 ? -3 : i === 1 || i === 3 ? -2 : -1;

      const rangeLabel =
        i === 0
          ? `${rangeMin} 이하`
          : i === 4
          ? `${rangeMax} 이상`
          : `${rangeMin} ~ ${rangeMax}`;

      values.push({ range: rangeLabel, count: count });
    }

    ranges.push({ name: changeKey, values: values });
  }

  return ranges;
};

// 결과 출력
export function calcResult(bestProd, selectObj) {
  // const { area, week } = selectObj;
  if (!selectObj) {
    return;
  }

  const negativeValues = Object.values(selectObj).filter((value) => value < 0);
  const counts = negativeValues.reduce((total, value) => total + value * 10, 0);

  // 우수농가 기본 생산량
  const bestProduction = bestProd * selectObj.area;
  // 우수농가의 주간 평균 생산량
  const weeklyAverageBestProduction = bestProduction / selectObj.week;

  // 사용자가 입력한 옵션에 따른 생산량
  const usersProduction = bestProduction + counts;
  // 사용자의 주간 평균 예상 생산량
  const weeklyAverageUsersProduction = usersProduction / selectObj.week;

  return {
    bestProduction: bestProduction,
    weeklyAverageBestProduction: parseFloat(
      weeklyAverageBestProduction.toFixed(2)
    ).toLocaleString(),
    usersProduction: usersProduction,
    weeklyAverageUsersProduction: parseFloat(
      weeklyAverageUsersProduction.toFixed(2)
    ).toLocaleString(),
  };
}
