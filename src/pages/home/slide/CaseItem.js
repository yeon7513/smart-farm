import React from "react";

function CaseItem({ img, why, name, content }) {
  return (
    <div className="case-item">
      <img src={img} alt={name} />
      <h3>{why}</h3>
      <p>{name}</p>
      <p>{content}</p>
    </div>
  );
}

export default CaseItem;
