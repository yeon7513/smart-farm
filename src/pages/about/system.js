import temperature from "../../assets/abou/온습도1.jpg";
import growth from "../../assets/abou/생육.jpg";
import water from "../../assets/abou/드론.jpeg";

export const systems = [
  {
    id: 1,
    name: "환경 제어 시스템",
    title:
      "자동화된 기술을 사용하여 온도, 습도,조명, CO2 농도,토양수분 등 다양한 환경 데이터를 실시간으로 수집하고 분석합니다.",
    images: temperature,
  },
  {
    id: 2,
    name: "관수 시스템",
    title:
      "드론을 이용하여 농작물의 위치와 상태를 정확히 파악하여 필요한곳에만 물을 공급하여, 효율적으로 물을 줄 수있습니다.",
    images: water,
  },
  {
    id: 3,
    name: "재배 시스템",
    title:
      "농장 모니터링을 통해  수확시기를 예측하거나, 작물에 맞는 최적의 재배 환경을 구축할 수 있습니다.",
    images: growth,
  },
];
