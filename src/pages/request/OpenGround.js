import React from "react";

const options = {
  "관수 시스템": [
    {
      id: "dripIrrigationSystem",
      value: "드립 관수 시스템",
      label: "드립 관수 시스템",
    },
    {
      id: "sprinklerSystem",
      value: "스프링클러 시스템",
      label: "스프링클러 시스템",
    },
  ],
  "토양 관리": [
    {
      id: "soilPhMeter",
      value: "토양 ph 측정기",
      label: "토양 ph 측정기",
    },
    {
      id: "soilHumiditySensor",
      value: "토양 습도 센서",
      label: "토양 습도 센서",
    },
  ],
  "비료 및 농약 관리": [
    {
      id: "fertilizerApplicationMachine",
      value: "비료 살포기",
      label: "비료 살포기",
    },
    {
      id: "pesticideSprayer",
      value: "농약 살포기",
      label: "농약 살포기",
    },
  ],
  모니터링: [
    {
      id: "weatherStation",
      value: "기상 스테이션",
      label: "기상 스테이션",
    },
    {
      id: "CCTV",
      value: "CCTV",
      label: "CCTV",
    },
  ],
  "지상용 드론": [
    {
      id: "quadcopter",
      value: "쿼드콥터",
      label: "쿼드콥터",
    },
    {
      id: "hexacopter",
      value: "헥사콥터",
      label: "헥사콥터",
    },
  ],
  트랙터: [
    {
      id: "MT7",
      value: "MT7",
      label: "MT7",
    },
    {
      id: "MT5",
      value: "MT5",
      label: "MT5",
    },
    {
      id: "MT4",
      value: "MT4",
      label: "MT4",
    },
  ],
  "기타 장비": [
    {
      id: "insectRepellect",
      value: "해충 퇴치기",
      label: "해충 퇴치기",
    },
    {
      id: "pestDigitalTrap",
      value: "해충 디지털 트랩",
      label: "해충 디지털 트랩",
    },
    { id: "birdRepellent", value: "조류 퇴치기", label: "조류 퇴치기" },
  ],
};

function OpenGround({ additionalOptions = {}, handleAdditionalOptionsChange }) {
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
                checked={checkedOptions[option.value] || false}
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

export default OpenGround;
