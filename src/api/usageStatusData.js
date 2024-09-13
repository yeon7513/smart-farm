// 전국 스마트팜 이용 현황
const apiKey = process.env.REACT_APP_SMART_FARM_BIG_DATA_API_KEY;
const apiUrl = `/smart/Agree_WS/webservices/ProvideRestService/getIdentityDataList/${apiKey}`;

export function usageStatusData() {
  let usageStatusResult = [];

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((result) => {
      result.forEach((item) => {
        usageStatusResult.push(item);
      });
      return usageStatusResult;
    });
}
