import cn from 'classnames';
import React, { useState } from 'react';
import { useSectorContext } from '../../../../../../../context/SectorContext';
import Card from './../../../../../../../components/card/Card';
import styles from './ControlItem.module.scss';
import ControlSwitch from './control-switch/ControlSwitch';

const INITIAL_OBJ = {
  id: '',
  label: '',
  on: true,
};

function ControlItem({
  option,
  idx,
  state,
  handleDeleteItem,
  docId,
  onMoveComponent,
  handleAddClick,
  handleRemoveClick,
  className,
}) {
  const { sector } = useSectorContext();

  const [controlObj, setControlObj] = useState(INITIAL_OBJ);
  const [isChecked, setIsChecked] = useState(false);

  const handleControlContent = () => {
    onMoveComponent({
      option,
      idx,
      id: sector.id,
    });
  };

  const handleAddToList = () => {
    handleAddClick({
      ...controlObj,
      id: `${sector.docId}_${idx}`,
      label: option,
    });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);

    console.log(checked);

    if (checked) {
      setControlObj({ ...controlObj, on: true });
    } else {
      setControlObj({ ...controlObj, on: false });
    }
  };

  return (
    <Card className={cn(styles.control, className)}>
      <div className={styles.name}>
        <h3>{option}</h3>
        <div className={styles.buttons}>
          {!state === true ? (
            <button onClick={handleAddToList}>
              <span>+</span>
            </button>
          ) : null}
          {state === false ? null : (
            <button onClick={() => handleDeleteItem(docId)}>
              <span>-</span>
            </button>
          )}
        </div>
      </div>
      <ControlSwitch
        id={`${sector.docId}_${idx}`}
        isChecked={isChecked}
        handleChange={handleCheckboxChange}
      />
    </Card>
  );
}

export default ControlItem;
