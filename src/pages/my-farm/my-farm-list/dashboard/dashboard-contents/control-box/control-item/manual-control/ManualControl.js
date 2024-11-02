import cn from "classnames";
import React, { useEffect, useState } from "react";
import TextInput from "../../../../../../../../components/form/text-input/TextInput";
import {
  getRandomValue,
  getUnitByLabel,
} from "../../../../../../../../utils/renameOptions";
import styles from "./ManualControl.module.scss";
import { useDispatch } from "react-redux";

function ManualControl({
  isChecked,
  setValue,
  settingValue,
  setSettingValue,
  handleSubmit,
  label,
}) {
  const [settings, setSettings] = useState(getRandomValue(label));
  const [isSet, setIsSet] = useState(false);
  const dispatch = useDispatch();
  const handleSetClick = () => {
    setIsSet(true);
  };
  const handleSave = (e) => {
    handleSubmit(e);
    setIsSet(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSettings(getRandomValue(label));
    }, 10000);

    return () => clearInterval(interval);
  }, [label]);

  useEffect(() => {
    if (!isChecked) {
      setIsSet(false);
    }
  }, [isChecked]);

  return (
    <div className={styles.manualControl}>
      {isChecked ? (
        <div className={cn(styles.content, styles.running)}>
          <p className={styles.preview}>
            {getUnitByLabel(
              label,
              ...(Array.isArray(settings) ? settings : [settings])
            )}
          </p>
        </div>
      ) : isSet ? (
        <form
          onSubmit={handleSave}
          className={cn(styles.content, styles.settingForm)}
        >
          <>
            <TextInput
              type="text"
              placeholder="설정값"
              value={settingValue}
              onChange={(e) => setSettingValue(e.target.value)}
            />
            <button type="submit">완료</button>
          </>
        </form>
      ) : (
        <button
          className={styles.setbtn}
          type="button"
          onClick={handleSetClick}
        >
          {setValue === "" ? (
            "변경"
          ) : (
            <>
              {getUnitByLabel(
                label,
                ...(Array.isArray(setValue) ? setValue : [setValue])
              )}
            </>
          )}
        </button>
      )}
      <div className={cn(styles.auto, isChecked ? "" : styles.stop)}></div>
    </div>
  );
}

export default ManualControl;
