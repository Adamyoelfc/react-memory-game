import React, { createContext, useState } from "react";

const StateContext = createContext({
  health: 10,
  setHealth: () => {},
});

export const StateProvider = ({ children }) => {
  const [health, setHealth] = useState(10);
  const updateHealth = (newHealth) => {
    setHealth(newHealth);
  };

  const contexValue = {
    health,
    setHealth: updateHealth,
  };
  return (
    <StateContext.Provider value={contexValue}>
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;

