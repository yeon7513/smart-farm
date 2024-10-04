import React from 'react';
import { PiSealWarningFill } from 'react-icons/pi';
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from 'react-icons/tb';
import styles from './DeleteFarm.module.scss';

function DeleteFarm({ farmName, crop, setIsDelete }) {
  const handleCheckDelete = (e) => {
    setIsDelete(e.target.checked);
  };

  return (
    <div className={styles.deleteConfirm}>
      <div className={styles.info}>
        <span>[농장 정보]</span>
        <h2>
          {farmName} / {crop}
        </h2>
      </div>
      <div className={styles.notice}>
        <h3>
          <span>
            <PiSealWarningFill />
          </span>
          삭제 시 주의사항
        </h3>
        <ul>
          <li>
            <span className={styles.numIcon}>
              <TbCircleNumber1Filled />
            </span>
            삭제할 항목이 정확한지 다시 한번 확인해 주세요.
          </li>
          <li>
            <span className={styles.numIcon}>
              <TbCircleNumber2Filled />
            </span>
            삭제된 데이터는 복구할 수 없으니, 삭제가 확실한 경우에만 진행해
            주세요.
          </li>
          <li>
            <span className={styles.numIcon}>
              <TbCircleNumber3Filled />
            </span>
            삭제 버튼을 클릭하기 전에 확인을 위해 체크박스를 체크해 주세요.
          </li>
        </ul>
      </div>
      <div className={styles.confirm}>
        <input id="check" type="checkbox" onChange={handleCheckDelete} />
        <label htmlFor="check">주의사항을 확인했습니다.</label>
      </div>
    </div>
  );
}

export default DeleteFarm;
