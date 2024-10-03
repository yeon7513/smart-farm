import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import TextInput from '../../../../../../../components/form/text-input/TextInput';
import { useSectorContext } from '../../../../../../../context/SectorContext';
import Card from './../../../../../../../components/card/Card';
import styles from './ControlItem.module.scss';
import ControlSwitch from './control-switch/ControlSwitch';

function ControlItem({
  option,
  idx,
  onUpdate,
  className,
  defaultChecked,
  isAdd,
  setValue,
}) {
  const { sector } = useSectorContext();

  const [isChecked, setIsChecked] = useState(defaultChecked);
  const [settingValue, setSettingValue] = useState(setValue || '');

  const handleAddClick = () => {
    onUpdate({ label: option, on: isChecked, isAdd: true, set: settingValue });
  };
  const handleRemoveClick = () => {
    onUpdate({ label: option, on: isChecked, isAdd: false, set: settingValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = Number(e.target[0].value);

    onUpdate({
      label: option,
      on: isChecked,
      isAdd: isAdd,
      set: value,
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
      <div className={styles.operating}>
        {isChecked ? (
          <div className={styles.auto}></div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.settingForm}>
            <TextInput
              type="text"
              placeholder="설정값"
              value={settingValue}
              onChange={(e) => setSettingValue(e.target.value)}
            />
            <button type="submit">설정</button>
          </form>
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
      </div>
    </Card>
  );
}

export default ControlItem;
