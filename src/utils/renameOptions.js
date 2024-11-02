export function renameOptionsKor(option) {
  switch (option) {
    case "thermostat":
      return "온도 조절기";
    case "ventilationSystem":
      return "환기 장치";
    case "shadingFilm":
      return "차광막";
    case "LEDGrowLights":
      return "인공 조명";
    case "automaticLightingRegulator":
      return "자동 조명 조절기";
    case "automaticIrrigationSystem":
      return "자동 관수 시스템";
    case "positiveLiquidMachine":
      return "양액기";
    case "temperatureHumiditySensor":
      return "온도 및 습도 센서";
    case "CO2Sensor":
      return "CO2 센서";
    case "cctv":
      return "cctv";
    case "positiveSolutionMeasurementSensor":
      return "양액 측정 센서";
    case "insectRepellect":
      return "해충 퇴치기";
    case "pestDigitalTrap":
      return "해충 디지털 트랩";
    case "birdRepellent":
      return "조류 퇴치기";
    case "dripIrrigationSystem":
      return "드립 관수 시스템";
    case "sprinklerSystem":
      return "스프링클러 시스템";
    case "soilPhMeter":
      return "토양 ph 측정기";
    case "soilHumiditySensor":
      return "토양 습도 센서";
    case "fertilizerApplicationMachine":
      return "비료 살포기";
    case "pesticideSprayer":
      return "농약 살포기";
    case "weatherStation":
      return "기상 스테이션";
    case "quadcopter":
      return "쿼드콥터";
    case "hexacopter":
      return "헥사콥터";
    case "MT7":
      return "MT7";
    case "MT5":
      return "MT5";
    case "MT4":
      return "MT4";
    case "groundBasedDrone":
      return "지상용 드론";
    case "selfDrivingTractor":
      return "자율주행 트랙터";

    default:
      return "기타";
  }
}

export function renameOptionsEn(option) {
  switch (option) {
    case "온도 조절기":
      return "thermostat";
    case "ventilationSystem":
      return "환기 장치";
    case "차광막":
      return "shadingFilm";
    case "인공 조명":
      return "LEDGrowLights";
    case "자동 조명 조절기":
      return "automaticLightingRegulator";
    case "자동 관수 시스템":
      return "automaticIrrigationSystem";
    case "양액기":
      return "positiveLiquidMachine";
    case "온도 및 습도 센서":
      return "temperatureHumiditySensor";
    case "CO2 센서":
      return "CO2Sensor";
    case "양액 측정 센서":
      return "positiveSolutionMeasurementSensor";
    case "cctv":
      return "cctv";
    case "드립 관수 시스템":
      return "dripIrrigationSystem";
    case "스프링클러 시스템":
      return "sprinklerSystem";
    case "토양 ph 측정기":
      return "soilPhMeter";
    case "토양 습도 센서":
      return "soilHumiditySensor";
    case "비료 살포기":
      return "fertilizerApplicationMachine";
    case "농약 살포기":
      return "pesticideSprayer";
    case "기상 스테이션":
      return "weatherStation";
    case "지상용 드론":
      return "groundBasedDrone";
    case "쿼드콥터":
      return "quadcopter";
    case "헥사콥터":
      return "hexacopter";
    case "MT7":
      return "MT7";
    case "MT5":
      return "MT5";
    case "MT4":
      return "MT4";
    case "해충 퇴치기":
      return "insectRepellect";
    case "자율주행 트랙터":
      return "selfDrivingTractor";
    case "해충 디지털 트랩":
      return "pestDigitalTrap";
    case "조류 퇴치기":
      return "birdRepellent";

    default:
      return "extra";
  }
}

// 카테고리로 나누기
export const controlCategories = {
  adjustableSettings: ["온도 조절기", "양액기", "인공 조명"],
  measurementSensors: [
    "온도 및 습도 센서",
    "CO2 센서",
    "토양 습도 센서",
    "양액 측정 센서",
    "토양 ph 측정기",
  ],
  automatedDevices: [
    "환기 장치",
    "차광막",
    "자동 조명 조절기",
    "자동 관수 시스템",
    "드립 관수 시스템",
    "스프링클러 시스템",
    "cctv",
    "기상 스테이션",
    "지상용 드론",
    "자율주행 트랙터",
    "해충 디지털 트랩",
    "조류 퇴치기",
    "비료 살포기",
    "농약 살포기",
    "기타",
  ],
};

export const getRandomValue = (label) => {
  const getRandomInRange = (min, max) =>
    (Math.random() * (max - min) + min).toFixed(1);

  switch (label) {
    case "온도 조절기":
      return getRandomInRange(23, 24.5);
    case "온도 및 습도 센서":
      return [getRandomInRange(23, 24.5), getRandomInRange(45, 55)];
    case "CO2 센서":
      return getRandomInRange(700, 800);
    case "양액기":
      return getRandomInRange(1.5, 2.0);
    case "토양 습도 센서":
      return getRandomInRange(35, 40);
    case "양액 측정 센서":
      return getRandomInRange(1000, 1100);
    case "토양 ph 측정기":
      return getRandomInRange(6.5, 6.8);
    case "인공 조명":
      return getRandomInRange(4000, 5000);
    default:
      return null;
  }
};

export const getUnitByLabel = (label, value1, value2) => {
  switch (label) {
    case "온도 조절기":
      return `${value1} °C`;
    case "온도 및 습도 센서":
      return `${value1} °C / ${value2} %`;
    case "CO2 센서":
      return `${value1} ppm`;
    case "양액기":
      return `${value1} L`;
    case "토양 습도 센서":
      return `${value1} %`;
    case "양액 측정 센서":
      return `${value1} ppm`;
    case "토양 ph 측정기":
      return `${value1} pH`;
    case "인공 조명":
      return `${value1} lx`;
    default:
      return value1;
  }
};
