import React from 'react';

function MemberList(props) {
  return (
    <div>
      <div>
        <input type="text" placeholder="회원 검색" />
        <button>검색</button>
      </div>
      <ul>
        <li>
          {/* 카드 컴포넌트로 바꿀 예정입니다. */}
          <h2>01</h2>
          <p>이름: 김철수</p>
          <p>이메일: cjftn114@gmail.com</p>
          <p>닉네임: 짱철수</p>
        </li>
      </ul>
    </div>
  );
}

export default MemberList;
