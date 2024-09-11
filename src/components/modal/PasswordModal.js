import React, { useState } from "react";
// import styles from "./PasswordModal.module.scss";

function PasswordModal({ onClose, onSubmit }) {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div>
      <div>
        <h3>비밀번호 입력</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요."
          />
          <button type="submit">확인</button>
          <button type="button" onClick={onClose}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;
