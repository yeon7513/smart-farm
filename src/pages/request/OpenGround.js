import React from "react";

function OpenGround({
  additionalOptions = {},
  handleAdditionalOptionsChange,
  options,
}) {
  return (
    <>
      {Object.keys(options).map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          {options[category].map((option) => (
            <div key={option.id}>
              <input
                type="checkbox"
                id={option.id}
                value={option.value}
                checked={additionalOptions[category]?.[option.value] || false}
                onChange={() => {
                  handleAdditionalOptionsChange(category, option.value);
                }}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default OpenGround;
