import React from "react";

function RequestOptions({ option, onCheckboxChange }) {
  return (
    <>
      {Object.keys(option).map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          {option[category].map((option) => (
            <div key={option.id}>
              <input
                type="checkbox"
                id={option.id}
                value={option.value}
                onChange={onCheckboxChange}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default RequestOptions;
