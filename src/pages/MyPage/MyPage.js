import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MyPage.module.scss";

function MyPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    address: user.address,
    phone: user.phone,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_USER", payload: formData });
    alert("정보가 업데이트되었습니다.");
  };

  return (
    <div className={styles.myPage}>
      <h1>마이페이지</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>전화번호</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.updateButton}>
          정보 수정
        </button>
      </form>

      <div className={styles.myPageButtons}>
        <button className={styles.manageFarmButton}>농장 관리창</button>
        <button className={styles.deleteAccountButton}>회원탈퇴</button>
        {!user.isMember && (
          <button className={styles.nonMemberButton}>비회원 전용 버튼</button>
        )}
      </div>
    </div>
  );
}

export default MyPage;
