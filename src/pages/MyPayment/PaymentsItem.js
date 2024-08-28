import React from "react";
import { Link } from "react-router-dom";

function PaymentsItem({ id }) {
  return (
    <li>
      <Link to={`/payment/${id}`}>결제내역</Link>
      <div>
        <h3>농사 종류</h3>
        <h4>부가 옵션</h4>
      </div>
    </li>
  );
}

export default PaymentsItem;
