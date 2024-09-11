import React, { useState } from 'react';

function Clock() {
  const [date, setDate] = useState(() => new Date());

  return <div>Clock</div>;
}

export default Clock;
