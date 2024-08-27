import React from "react";
import styles from "./Sidebar.module.scss";

function Sidebar(props) {
  return (
  <div className="sideBarContainer">
  <div className="inWrap">
    <h2>마이페이지</h2>
<ul>
<li>내 정보</li>
  <div className="privacyWrap">
    <ul>
    <li>포르필 사진</li>
    <li>닉네임</li>
    <li>비밀번호 </li>
    <li>집 주소</li>
    </ul>
  </div>
  </ul>
  </div>
  </div>
  
  );
}

export default Sidebar;
