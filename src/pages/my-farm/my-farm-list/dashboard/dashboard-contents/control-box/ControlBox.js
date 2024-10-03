import React, { useEffect, useState } from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';
import {
  getControlItem,
  saveControlItem,
} from '../../../../../../utils/indexedDB';
import { renameOptionsKor } from '../../../../../../utils/renameOptions';
import ControlItem from './control-item/ControlItem';
import styles from './ControlBox.module.scss';

function ControlBox() {
  const { sector } = useSectorContext();

  const [selectedControls, setSelectedControls] = useState([]);

  const isAdmin = JSON.parse(localStorage.getItem('user')).email.includes(
    'admin'
  );

  // 컨트롤 활성 옵션 필터링
  const filteredOptions = Object.entries(sector?.control || {})
    .filter(([key, value]) => (isAdmin ? true : value === 'Y'))
    .map(([key, value]) => ({
      label: renameOptionsKor(key),
      isDisabled: value === 'N',
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'ko-KR'));

  const loadControlList = async () => {
    try {
      const list = await getControlItem(sector.docId);
      setSelectedControls(list);
    } catch (error) {
      console.error('indexedDB 로드 실패: ', error);
    }
  };

  // indexedDB 수정
  const handleUpdateControlItem = async (newItem) => {
    await saveControlItem(sector.docId, newItem);
    await loadControlList();
  };

  useEffect(() => {
    loadControlList();
  }, [sector.docId]);

  return (
    <>
      <div className={styles.control}>
        {filteredOptions.map((option, idx) => {
          const selectedControl = selectedControls.find(
            (control) => control.label === option.label
          );

          return (
            <ControlItem
              key={idx}
              idx={idx}
              docId={sector.docId}
              option={option.label}
              defaultChecked={selectedControl ? selectedControl.on : true}
              isAdd={selectedControl ? selectedControl.isAdd : false}
              setValue={selectedControl ? selectedControl.set : 0}
              className={option.isDisabled ? styles.disabled : ''}
              onUpdate={handleUpdateControlItem}
            />
          );
        })}
      </div>
    </>
  );
}

export default ControlBox;
