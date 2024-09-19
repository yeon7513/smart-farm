import React from 'react';

function SelectCrops({ selectCrop, farmCode, setFarmCode }) {
  const { id, name, value } = selectCrop;

  return (
    <label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name="crops"
        value={value}
        checked={farmCode === value}
        onChange={(e) => setFarmCode(e.target.value)}
      />
      <span>{name}</span>
    </label>
  );
}

export default SelectCrops;
