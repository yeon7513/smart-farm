import React from 'react';
import styles from './TextInput.module.scss';

function TextInput({ label, name, value, onChange, isDisabled = false }) {
  return (
    <label className={styles.label}>
      <span>{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
      />
    </label>
  );
}

export default TextInput;
