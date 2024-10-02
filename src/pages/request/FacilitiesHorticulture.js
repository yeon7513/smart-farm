import React from "react";
import styles from "./FacilitiesHorticulture.module.scss";

function FacilitiesHorticulture({
  additionalOptions = {},
  handleAdditionalOptionsChange,
  options = {},
}) {
  return (
    <>
      {Object.keys(options).map((category) => (
        <div key={category} className={styles.category}>
          <h4>{category}</h4>
          {options[category].map((option) => (
            <div key={option.id} className={styles.additionalOptions}>
              <input
                type="checkbox"
                id={option.id}
                value={option.value}
                checked={additionalOptions[category]?.[option.value] || false}
                onChange={() => {
                  handleAdditionalOptionsChange(category, option.value);
                }}
                className={styles.input}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default FacilitiesHorticulture;
