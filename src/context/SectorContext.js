import React, { createContext, useContext, useState } from "react";

const SectorContext = createContext();

export function SectorProvider({ children }) {
  const [sector, setSector] = useState(null);

  return (
    <SectorContext.Provider value={{ sector, setSector }}>
      {children}
    </SectorContext.Provider>
  );
}

export function useSectorContext() {
  return useContext(SectorContext);
}
