export function renameOptionsKor(option) {
  switch (option) {
    case 'thermostat':
      return '온도 조절기';
    case 'ventilationSystem':
      return '환기 장치';
    case 'shadingFilm':
      return '차광막';
    case 'artificialLighting':
      return '인공 조명';
    case 'automaticLightingRegulator':
      return '자동 조명 조절기';
    case 'automaticIrrigationSystem':
      return '자동 관수 시스템';
    case 'nutrientLiquidMachine':
      return '양액기';
    case 'temperatureAndHumiditySensors':
      return '온도 및 습도 센서';
    case 'co2Sensor':
      return 'CO2 센서';
    case 'nutrientLiquidMeasurementSensor':
      return '양액 측정 센서';
    case 'CCTV':
      return 'CCTV';
    case 'dripIrrigationSystem':
      return '드립 관수 시스템';
    case 'sprinkler':
      return '스프링클러 시스템';
    case 'soilPhMeter':
      return '토양 ph 측정기';
    case 'soilHumiditySensor':
      return '토양 습도 센서';
    case 'fertilizerSprayer':
      return '비료 살포기';
    case 'pesticideSprayer':
      return '농약 살포기';
    case 'weatherStation':
      return '기상 스테이션';
    case 'groundBasedDrone':
      return '지상용 드론';
    case 'selfDrivingTractor':
      return '자율주행 트랙터';
    case 'digitalTrapsForPest':
      return '해충 디지털 트랩';
    case 'birdRepellent':
      return '조류 퇴치기';

    default:
      return '기타';
  }
}

export function renameOptionsEn(option) {
  switch (option) {
    case '온도 조절기':
      return 'thermostat';
    case 'ventilationSystem':
      return '환기 장치';
    case '차광막':
      return 'shadingFilm';
    case '인공 조명':
      return 'artificialLighting';
    case '자동 조명 조절기':
      return 'automaticLightingRegulator';
    case '자동 관수 시스템':
      return 'automaticIrrigationSystem';
    case '양액기':
      return 'nutrientLiquidMachine';
    case '온도 및 습도 센서':
      return 'temperatureAndHumiditySensors';
    case 'CO2 센서':
      return 'co2Sensor';
    case '양액 측정 센서':
      return 'nutrientLiquidMeasurementSensor';
    case 'CCTV':
      return 'CCTV';
    case '드립 관수 시스템':
      return 'dripIrrigationSystem';
    case '스프링클러 시스템':
      return 'sprinkler';
    case '토양 ph 측정기':
      return 'soilPhMeter';
    case '토양 습도 센서':
      return 'soilHumiditySensor';
    case '비료 살포기':
      return 'fertilizerSprayer';
    case '농약 살포기':
      return 'pesticideSprayer';
    case '기상 스테이션':
      return 'weatherStation';
    case '지상용 드론':
      return 'groundBasedDrone';
    case '자율주행 트랙터':
      return 'selfDrivingTractor';
    case '해충 디지털 트랩':
      return 'digitalTrapsForPest';
    case '조류 퇴치기':
      return 'birdRepellent';

    default:
      return 'extra';
  }
}
