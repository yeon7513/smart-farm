import React from 'react';
import { useSectorContext } from '../../../../../../../context/SectorContext';
import styles from './ControlItem.module.scss';

function ControlItem({
  option,
  idx,
  state,
  handleDeleteItem,
  docId,
  onMoveComponent,
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
    <div className={styles.control}>
      <div className={styles.name}>
        <div>{option}</div>
      </div>
      <div>
        <div>
          <button>ON</button>
          <button>OFF</button>
        </div>
      </div>
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
  );
}

export default ControlItem;
