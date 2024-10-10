import cn from "classnames";
import React, { useEffect, useState } from "react";
import { useSectorContext } from "../../../../../../../context/SectorContext";
import Card from "./../../../../../../../components/card/Card";
import styles from "./ControlItem.module.scss";
import AutomaticControl from "./automatic-control/AutomaticControl";
import ControlSwitch from "./control-switch/ControlSwitch";
import ManualControl from "./manual-control/ManualControl";
import MeasurementControl from "./measurement-control/MeasurementControl";

function ControlItem({
  option,
  category,
  idx,
  onUpdate,
  className,
  defaultChecked,
  isAdd,
  setValue,
}) {
  const { sector } = useSectorContext();
  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [settingValue, setSettingValue] = useState(setValue);

  const handleAddClick = () => {
    onUpdate({
      label: option,
      on: isChecked,
      isAdd: true,
      set: settingValue,
      category: category,
    });
  };

  const handleRemoveClick = () => {
    onUpdate({
      label: option,
      on: isChecked,
      isAdd: false,
      set: settingValue,
      category: category,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = Number(e.target[0].value);

    onUpdate({
      label: option,
      on: isChecked,
      isAdd: isAdd,
      set: value,
      category: category,
    });

    setSettingValue(value);
  };

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  return (
    <Card className={cn(styles.control, className)}>
      <div className={styles.name}>
        <h3>{option}</h3>
        <div className={styles.buttons}>
          {isAdd ? (
            <button onClick={handleRemoveClick}>
              <span>-</span>
            </button>
          ) : (
            <button onClick={handleAddClick}>
              <span>+</span>
            </button>
          )}
        </div>
      </div>
      {category === "adjustableSettings" ? (
        <ManualControl
          isChecked={isChecked}
          handleSubmit={handleSubmit}
          setValue={setValue}
          settingValue={settingValue}
          setSettingValue={setSettingValue}
          label={option}
        />
      ) : category === "measurementSensors" ? (
        <MeasurementControl isChecked={isChecked} label={option} />
      ) : (
        <AutomaticControl isChecked={isChecked} />
      )}
      <ControlSwitch
        id={`${sector.docId}_${idx}`}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        label={option}
        isAdd={isAdd}
        settingValue={settingValue}
        onUpdate={onUpdate}
      />
    </Card>
  );
}

export default ControlItem;
