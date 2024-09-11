import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deactivationDashboard,
  updateCommonInfo,
} from '../../../../store/dashboard/dashboardSlice';
import CustomModal from './../../../../components/modal/CustomModal';
import styles from './FarmListItem.module.scss';
import DeleteFarm from './delete-farm/DeleteFarm';
import EditFarm from './edit-farm/EditFarm';

function FarmListItem({ farmData }) {
  const { crop, farmName, docId } = farmData;
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [editedFarmName, setEditedFarmName] = useState(farmName);
  const [editedCrop, setEditedCrop] = useState(crop);
  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditOpen = () => {
    setIsOpen(true);
    setModalType('edit');
  };
  const handleDeleteOpen = () => {
    setIsOpen(true);
    setModalType('delete');
  };
  const handleClose = () => {
    setIsOpen(false);
    setModalType(null);
    setIsDelete(false);
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

  const handleDeactivation = (e) => {
    const params = {
      collectionName: 'dashboard',
      docId: docId,
      fieldName: 'deleteYn',
    };

    if (isDelete) {
      dispatch(deactivationDashboard(params));
      setIsOpen(false);
    }

    setIsDelete(false);
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
        <button onClick={handleEditOpen}>수정</button>
        <button className={styles.deleteBtn} onClick={handleDeleteOpen}>
          삭제
        </button>
      </div>
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          handleClose={handleClose}
          btnHandler={modalType === 'delete' ? handleDeactivation : handleSave}
          btnName={modalType === 'delete' ? '삭제' : '수정'}
          title={
            modalType === 'delete'
              ? `${farmName} 삭제`
              : `${farmName} 정보 수정`
          }
          isDisabled={modalType === 'delete' ? !isDelete : false}
        >
          {modalType === 'delete' ? (
            <DeleteFarm
              farmName={farmName}
              crop={crop}
              setIsDelete={setIsDelete}
            />
          ) : (
            <EditFarm
              editedFarmName={editedFarmName}
              editedCrop={editedCrop}
              setEditedFarmName={setEditedFarmName}
              setEditedCrop={setEditedCrop}
            />
          )}
        </CustomModal>
      )}
    </li>
  );
}

export default FarmListItem;
