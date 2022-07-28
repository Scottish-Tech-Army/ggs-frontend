import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext({});

const UNIT_KEY = "ggsUnit"

const AuthProvider = ({ children }) => {
  const [unit, setUnit] = useState();

  useEffect(() => {
    const storedUnit = window.localStorage.getItem(UNIT_KEY)
    console.log("Retrieved stored unit", storedUnit);
    storedUnit && setUnit(JSON.parse(storedUnit));
  }, []);

  useEffect(() => {
    const storedUnit = window.localStorage.getItem(UNIT_KEY)
    if (unit && (!storedUnit || unit !== JSON.parse(storedUnit))) {
      window.localStorage.setItem(UNIT_KEY, JSON.stringify(unit));
    }
  }, [unit]);

  return (
    <authContext.Provider value={{ unit, setUnit }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;