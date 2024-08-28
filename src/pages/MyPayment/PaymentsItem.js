import React from "react";
import { Link } from "react-router-dom";

function PaymentsItem({ id }) {
  return (
    <li>
      <Link to={`/payment/${id}`}>테스트</Link>
      <div>
        <h4>카테고리</h4>
        <h3>제목</h3>
      </div>
    </li>
  );
}

export default PaymentsItem;
