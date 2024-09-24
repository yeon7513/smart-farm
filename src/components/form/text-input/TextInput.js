import React from 'react';

function TextInput({
  type,
  className,
  name,
  value,
  placeholder,
  isDisabled,
  onChange,
}) {
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={isDisabled}
      autoComplete="off"
    />
  );
}

export default TextInput;
