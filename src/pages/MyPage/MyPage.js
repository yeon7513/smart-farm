import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { useNavigate } from "react-router-dom";
import { deleteDatas, getDatas } from "../../api/firebase";

function MyPage() {
  const [user, setUser] = useState({ isAuthenticated: true });
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const idExtraction = async () => {
    // localStorage에 있는 사용자의 정보를 추출합니다.
    const userStr = JSON.parse(localStorage.getItem("user"));

    // "user" 키에 데이터가 저장되어 있지 않은 경우
    if (!userStr) {
      alert("로그인이 되어있지 않습니다.");
      navigate(-1);
    }

    try {
      if (userStr.email) {
        setUser(userStr);

        // email이 있으면 infoExtraction 호출
        await infoExtraction(userStr.email);
      } else {
        console.error("Email not found in user object");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const infoExtraction = async (e) => {
    try {
      // Firebase database에서 문서 목록을 가져옵니다.
      const snapshots = await getDatas("users");

      // email과 일치하는 문서 객체 찾기
      const matchingDoc = snapshots.find((doc) => doc.id === doc);
      if (matchingDoc) {
        // 일치하는 문서를 상태에 설정하고 콘솔에 출력
        setAddress(matchingDoc.address);
        setNumber(matchingDoc.number);
        setPassword(matchingDoc.password);
      }
      console.log(
        "Matching Document:",
        matchingDoc.address,
        matchingDoc.number,
        matchingDoc.password
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
    setNumber(e.target.number);
    setPassword(e.target.password);
  };

  const handleDelete = async () => {
    const userStr = localStorage.getItem("user");

    // 사용자 데이터가 없거나 잘못된 형식이면
    if (!userStr) {
      alert("사용자 정보가 없습니다.");
      return;
    }

    // JSON 파싱 시 예외의 경우
    let user;
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      alert("사용자 정보가 잘못되었습니다.");
      return;
    }

    // 탈퇴 확인
    if (window.confirm("정말 회원 탈퇴 하시겠습니까?")) {
      try {
        // 함수가 성공적으로 작동하는 경우 Firebase database에서 사용자 제거
        await deleteDatas("users", user.docId);

        // 로컬 스토리지에서 사용자 제거
        localStorage.removeItem("user");

        alert("회원 탈퇴가 성공적으로 완료되었습니다.");
      } catch (error) {
        console.error("회원 탈퇴 중 오류가 발생했습니다.", error);
        alert("회원 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  useEffect(() => {
    idExtraction();
  }, []);
  return (
    // <Link>pageContent</Link>
    <div className={styles.myPage}>
      <h1>마이페이지</h1>
      <h2>기본 정보</h2>
      {user && user.isAuthenticated ? (
        <form>
          <div className={styles.formGroup}>
            <label>주소</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>전화번호</label>
            <input
              type="text"
              name="phone"
              value={number}
              onChange={handleNumberChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className={styles.updateButton}
            onChange={handleSubmit}
          >
            정보 수정
          </button>
        </form>
      ) : (
        <p>회원가입이 안 되어 있어서 접근할 수 없습니다.</p>
      )}
      <div className={styles.myPageButtons}>
        <button className={styles.manageFarmButton}>내 농장 관리</button>
        <button className={styles.deleteAccountButton} onClick={handleDelete}>
          회원탈퇴
        </button>
      </div>
    </div>
  );
}

export default MyPage;
