import React from 'react';

function SimulationBtn({ children, name, count, onClick }) {
  const handleClick = () => {
    onClick(name, count);
  };

  return <button onClick={handleClick}>{children}</button>;
}

export default SimulationBtn;
