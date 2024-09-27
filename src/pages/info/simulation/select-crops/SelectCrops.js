import React from 'react';

function SelectCrops({ selectCrop, farmCode, setFarmCode, setBestProdValue }) {
  const { id, name, value, prodPerArea } = selectCrop;

  const handleSelectCrops = (e) => {
    setFarmCode(e.target.value);
    setBestProdValue(prodPerArea);
  };

  return (
    <label htmlFor={id}>
      <input
        type="radio"
        id={id}
        name="crops"
        value={value}
        checked={farmCode === value}
        onChange={handleSelectCrops}
      />
      <span>{name}</span>
    </label>
  );
}

export default SelectCrops;
