import React from 'react';

function SimulationBtn({ children, name, count, onClick, className }) {
  const handleClick = () => {
    onClick(name, count);
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

export default SimulationBtn;
