import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function CustomerServiceCenter() {
  return (
    <div>
      <Link to="/customer-service-center/request">견적의뢰하기</Link>
      <Link to="/customer-service-center/faq">FAQ</Link>
      <Outlet />
    </div>
  );
}

export default CustomerServiceCenter;
