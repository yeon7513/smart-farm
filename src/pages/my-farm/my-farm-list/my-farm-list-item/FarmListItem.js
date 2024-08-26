import React from 'react';
import { useNavigate } from 'react-router-dom';

function FarmListItem({ farmId, name }) {
  const navigate = useNavigate();

  return (
    <div>
      <ul>
        <li>
          <div>{name}</div>
          <div>
            <button onClick={() => navigate(`/my-farm/${farmId}`)}>관리</button>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default FarmListItem;
