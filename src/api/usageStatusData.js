// 전국 스마트팜 이용 현황
const apiKey = 'cbd181f0a2594233a01eed9b0b86a392';
const apiUrl = `/smart/Agree_WS/webservices/ProvideRestService/getIdentityDataList/${apiKey}`;

let usageStatusResult = [];

export function usageStatusData() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((result) => {
      result.forEach((item) => {
        usageStatusResult.push(item);
      });
      return console.log(usageStatusResult.slice(0, 100));
    });
}
