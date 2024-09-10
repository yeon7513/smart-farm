import React from "react";

function RequestOptions({ option }) {
  return (
    <>
      {Object.keys(option).map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          {option[category].map((option) => (
            <div key={option.id}>
              <input type="checkbox" id={option.id} value={option.value} />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default RequestOptions;
