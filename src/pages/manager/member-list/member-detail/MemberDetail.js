import React from 'react';

function MemberDetail(props) {
  return (
    <div>
      <span>01</span>
      <div>
        <img src="./img/profile.webp" alt="" />
        <p>이름: 김철수</p>
        <p>이메일: cjftn114@gmail.com</p>
        <p>닉네임: 짱철수</p>
        <p>신고 누적 횟수: 0회</p>
      </div>
      <div>
        <button>정보 수정</button>
        <button>스마트팜 관리</button>
      </div>
    </div>
  );
}

export default MemberDetail;
