import React, { forwardRef } from 'react';

const TextInput = forwardRef(
  (
    {
      type = 'text',
      className,
      placeholder,
      name,
      onChange,
      value,
      isDisabled = false,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={className}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={isDisabled}
      />
    );
  }
);

export default TextInput;
