import React from 'react';
import styles from './EditFarm.module.scss';

function EditFarm({
  editedFarmName,
  editedCrop,
  setEditedFarmName,
  setEditedCrop,
}) {
  const handleChangeFarmName = (e) => {
    setEditedFarmName(e.target.value);
  };
  const handleChangeCrop = (e) => {
    setEditedCrop(e.target.value);
  };

  return (
    <div className={styles.edit}>
      <div className={styles.editContent}>
        <label htmlFor="farmName">농장 이름</label>
        <input
          type="text"
          id="farmName"
          value={editedFarmName}
          onChange={handleChangeFarmName}
        />
      </div>
      <div className={styles.editContent}>
        <label htmlFor="crop">작물</label>
        <select id="crop" value={editedCrop} onChange={handleChangeCrop}>
          <option value="딸기">딸기</option>
          <option value="토마토">토마토</option>
          <option value="방울토마토">방울토마토</option>
          <option value="블루베리">블루베리</option>
          <option value="파프리카">파프리카</option>
          <option value="참외">참외</option>
        </select>
      </div>
    </div>
  );
}

export default EditFarm;
