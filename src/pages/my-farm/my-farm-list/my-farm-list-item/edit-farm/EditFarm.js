import React, { useRef, useState } from 'react';
import styles from './EditFarm.module.scss';

function EditFarm({
  editedFarmName,
  editedCrop,
  setEditedFarmName,
  setEditedCrop,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const handleChangeFarmName = (e) => {
    const value = e.target.value;

    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{0,8}$/;

    if (regex.test(value)) {
      setEditedFarmName(value);
      setErrorMessage('');
    } else {
      setErrorMessage('최대 8자리, 특수문자는 사용이 불가능합니다.');
      inputRef.current.focus();
    }
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
          maxLength={8}
          value={editedFarmName}
          onChange={handleChangeFarmName}
          placeholder="최대 8자리, 특수문자는 사용이 불가능합니다."
          ref={inputRef}
          style={{ outline: errorMessage ? '2px solid #ca2b34' : 'none' }}
        />
        {errorMessage && <p className={styles.warning}>{errorMessage}</p>}
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
