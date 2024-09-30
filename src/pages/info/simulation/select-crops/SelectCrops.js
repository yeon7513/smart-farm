import React from 'react';
import { GiBellPepper, GiStrawberry, GiTomato } from 'react-icons/gi';
import styles from './SelectCrop.module.scss';

function SelectCrops({ selectCrop, farmCode, setFarmCode, setBestProdValue }) {
  const { id, name, value, prodPerArea } = selectCrop;

  const handleChangeFarmCode = (code) => {
    switch (code) {
      case '딸기':
        return <GiStrawberry />;
      case '토마토':
        return <GiTomato />;
      case '파프리카':
        return <GiBellPepper />;
      default:
        return <GiStrawberry />;
    }
  };

  const handleSelectCrops = (e) => {
    setFarmCode(e.target.value);
    setBestProdValue(prodPerArea);
  };

  return (
    <div className={styles.selectCropBtn}>
      <input
        type="radio"
        id={id}
        name="crops"
        value={value}
        checked={farmCode === value}
        onChange={handleSelectCrops}
      />
      <label htmlFor={id}>{handleChangeFarmCode(name)}</label>
    </div>
  );
}

export default SelectCrops;
