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
