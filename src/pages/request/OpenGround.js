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
  "기상 모니터링": [
    {
      id: "weatherStation",
      value: "기상 스테이션",
      label: "기상 스테이션",
    },
  ],
  "기타 장비": [
    {
      id: "groundBasedDrone",
      value: "지상용 드론",
      label: "지상용 드론",
    },
    {
      id: "tractor",
      value: "트랙터",
      label: "트랙터",
    },
  ],
};

function OpenGround({ additionalOptions = [], handleAdditionalOptionsChange }) {
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

export default OpenGround;
