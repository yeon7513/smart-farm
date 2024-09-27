import React from 'react';

function SimulationBtn({ children, count }) {
  return (
    <div>
      <button onClick={() => console.log(count)}>{children}</button>
    </div>
  );
}

export default SimulationBtn;
