import React from "react";

const options = {
  "환경 제어": [
    {
      id: "thermostat",
      value: "온도 조절기",
      label: "온도 조절기: 35,000원",
    },
    {
      id: "ventilationSystem",
      value: "환기 장치",
      label: "환기 장치: 201,500원",
    },
    { id: "shadingFilm", value: "차광막", label: "차광막: 78,200원" },
  ],
  "조명 시스템": [
    {
      id: "LEDGrowLights",
      value: "인공 조명",
      label: "인공 조명: 186,670원",
    },
    {
      id: "automaticLightingRegulator",
      value: "자동 조명 조절기",
      label: "자동 조명 조절기: 32,400원",
    },
  ],
  "관수 시스템": [
    {
      id: "automaticIrrigationSystem",
      value: "자동 관수 시스템",
      label: "자동 관수 시스템: 56,800원",
    },
    {
      id: "positiveLiquidMachine",
      value: "양액기",
      label: "양액기: 328,500원",
    },
  ],
  "센서 및 모니터링": [
    {
      id: "temperatureHumiditySensor",
      value: "온도 및 습도 센서",
      label: "온도 및 습도 센서: 90,090원",
    },
    {
      id: "CO2Sensor",
      value: "CO2 센서",
      label: "CO2 센서: 66,000원",
    },
  ],
  "기타 장비": [
    {
      id: "positiveSolutionMeasurementSensor",
      value: "양액측정센서",
      label: "양액측정센서: 569,720원",
    },
    { id: "CCTV", value: "CCTV", label: "CCTV: 39,800원" },
  ],
};

function FacilitiesHorticulture({
  additionalOptions = [],
  handleAdditionalOptionsChange,
}) {
  const checkedOptions = additionalOptions || [];
  return (
    <>
      {Object.keys(options).map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          {options[category].map((option) => (
            <div key={option.id}>
              <input
                type="checkbox"
                id={option.id}
                value={option.value}
                checked={checkedOptions.includes(option.value)}
                onChange={handleAdditionalOptionsChange}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default FacilitiesHorticulture;
