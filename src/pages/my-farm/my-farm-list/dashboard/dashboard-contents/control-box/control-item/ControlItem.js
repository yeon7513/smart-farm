import cn from 'classnames';
import React from 'react';
import { useSectorContext } from '../../../../../../../context/SectorContext';
import Card from './../../../../../../../components/card/Card';
import styles from './ControlItem.module.scss';
import ControlSwitch from './control-switch/ControlSwitch';

function ControlItem({
  option,
  idx,
  state,
  handleDeleteItem,
  docId,
  onMoveComponent,
  className,
}) {
  const { sector } = useSectorContext();

  const handleControlContent = () => {
    onMoveComponent({
      option,
      idx,
      id: sector.id,
    });
  };

  return (
    <Card className={cn(styles.control, className)}>
      <div className={styles.name}>
        <h3>{option}</h3>
        <div className={styles.buttons}>
          {!state === true ? (
            <button onClick={handleControlContent}>
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
      <ControlSwitch id={idx} />
    </Card>
  );
}

export default ControlItem;
