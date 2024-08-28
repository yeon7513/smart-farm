import React, { createContext, useContext, useState } from "react";

const ComponentContext = createContext();

export function ComponentProvider({ children }) {
  const [currComp, setCurrComp] = useState(null);

  return (
    <ComponentContext.Provider value={{ currComp, setCurrComp }}>
      {children}
    </ComponentContext.Provider>
  );
}

export function useComponentContext() {
  return useContext(ComponentContext);
}
