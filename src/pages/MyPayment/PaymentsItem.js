import React from "react";
import { Link } from "react-router-dom";

function PaymentsItem({ id }) {
  return (
    <li>
      <Link to={`/payment/${id}`}>테스트</Link>
      <div>
        <h3>농사 종류</h3>
        <h4>부가 옵션</h4>
      </div>
      <div>
        <h4>비용: </h4>
        <span> 원 </span>
      </div>
    </li>
  );
}

export default PaymentsItem;
