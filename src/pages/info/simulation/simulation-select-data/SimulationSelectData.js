import React, { useState } from "react";
import SimulationBtn from "./simulation-btns/SimulationBtn";
import styles from "./SimulationSelectData.module.scss";

function SimulationSelectData({ selectDatas, onClick }) {
  const [selectedIndexes, setSelectedIndexes] = useState({});

  const handleClick = (dataName, count, index) => {
    setSelectedIndexes((prev) => ({ ...prev, [dataName]: index }));
    onClick(dataName, count);
  };

  return (
    <div className={styles.selectBox}>
      {selectDatas.map((data, idx) => (
        <div key={idx} className={styles.content}>
          <h4 className={styles.label}>{data.name}</h4>
          <div className={styles.btns}>
            {data.values.map((value, valIdx) => {
              const isSelected = selectedIndexes[data.name] === valIdx;

              return (
                <SimulationBtn
                  key={valIdx}
                  name={data.name}
                  count={value.count}
                  onClick={() => handleClick(data.name, value.count, valIdx)}
                  className={isSelected ? styles.selected : ""}
                >
                  {value.range}
                </SimulationBtn>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SimulationSelectData;
