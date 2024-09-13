import React from "react";
import styles from "./PasswordModal.module.scss";

function PasswordModal({ inputRef, password, onPasswordChange, errorMessage }) {
  return (
    <div className={styles.container}>
      <div className={styles.password}>
        <h2>암호 입력</h2>
        <input
          ref={inputRef}
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="설정한 암호를 입력하세요."
        />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default PasswordModal;
