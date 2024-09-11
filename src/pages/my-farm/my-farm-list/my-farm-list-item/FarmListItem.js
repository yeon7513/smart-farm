import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCommonInfo } from '../../../../store/dashboard/dashboardSlice';
import CustomModal from './../../../../components/modal/CustomModal';
import styles from './FarmListItem.module.scss';

function FarmListItem({ farmData }) {
  const { crop, farmName, docId } = farmData;
  const [isOpen, setIsOpen] = useState(false);
  const [editedFarmName, setEditedFarmName] = useState(farmName);
  const [editedCrop, setEditedCrop] = useState(crop);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleSave = () => {
    const updateObj = {
      ...farmData,
      farmName: editedFarmName,
      crop: editedCrop,
      updatedAt: new Date().getTime(),
    };

    const params = {
      collectionName: 'dashboard',
      docId: docId,
      updateObj,
    };

    dispatch(updateCommonInfo(params));
    setIsOpen(false);
  };

  return (
    <li className={styles.item}>
      <div className={styles.name}>
        {farmName} / {crop}
      </div>
      <div className={styles.btns}>
        <button
          onClick={() => navigate(`/my-farm/${docId}`, { state: farmData })}
        >
          관리
        </button>
        <button onClick={handleEdit}>수정</button>
        <button className={styles.deleteBtn}>삭제</button>
      </div>
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          handleClose={() => setIsOpen(false)}
          btnHandler={handleSave}
          btnName={'수정'}
          title={`${farmName} 정보 수정`}
        >
          <div className={styles.edit}>
            <div className={styles.editContent}>
              <label htmlFor="farmName">농장 이름</label>
              <input
                type="text"
                id="farmName"
                value={editedFarmName}
                onChange={(e) => setEditedFarmName(e.target.value)}
              />
            </div>
            <div className={styles.editContent}>
              <label htmlFor="crop">작물</label>
              <select
                id="crop"
                value={editedCrop}
                onChange={(e) => setEditedCrop(e.target.value)}
              >
                <option value="딸기">딸기</option>
                <option value="토마토">토마토</option>
                <option value="방울토마토">방울토마토</option>
                <option value="블루베리">블루베리</option>
                <option value="파프리카">파프리카</option>
                <option value="참외">참외</option>
              </select>
            </div>
          </div>
        </CustomModal>
      )}
    </li>
  );
}

export default FarmListItem;
