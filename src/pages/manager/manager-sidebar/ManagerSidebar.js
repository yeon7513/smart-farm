import React from 'react';
import { Link } from 'react-router-dom';

function ManagerSidebar() {
  return (
    <ul>
      <li>
        <Link>회원 관리</Link>
      </li>
      <li>
        <Link>견적 관리</Link>
      </li>
      <li>
        <Link>신고 관리</Link>
      </li>
      <li>
        <Link>A/S 관리</Link>
      </li>
      <li>
        <Link>챗봇 관리</Link>
      </li>
    </ul>
  );
}

export default ManagerSidebar;
