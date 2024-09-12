import React from "react";

function Checkout({ className, type, description, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <div>
      <button className={className} type={type} onClick={handleClick}>
        {description}
      </button>
    </div>
  );
}

export default Checkout;
