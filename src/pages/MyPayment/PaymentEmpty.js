import React from "react";
import { Link } from "react-router-dom";

function PaymentEmpty({ title }) {
  return (
    <div>
      <h1>{title}이(가) 비어있습니다.</h1>
      <Link to="/">견적 문의하기</Link>
    </div>
  );
}

export default PaymentEmpty;
