import React from 'react';

function SimulationBtn({ children, name, count, onClick }) {
  const handleClick = () => {
    onClick(name, count);
    console.log('count: ', count);
  };

  return (
    <div>
      <button onClick={handleClick}>{children}</button>
    </div>
  );
}

export default SimulationBtn;
