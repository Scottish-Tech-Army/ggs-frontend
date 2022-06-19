import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext({});

const UNIT_NAME_KEY = "ggsUnitName"

const AuthProvider = ({ children }) => {
  const [unitName, setUnitName] = useState();

  useEffect(() => {
    const storedUnitName = window.localStorage.getItem(UNIT_NAME_KEY)
    console.log("Retrieved stored unitname", storedUnitName);
    storedUnitName && setUnitName(storedUnitName);
  }, []);

  useEffect(() => {
    const storedUnitName = window.localStorage.getItem(UNIT_NAME_KEY)
    if (unitName && unitName !== storedUnitName) {
      window.localStorage.setItem(UNIT_NAME_KEY, unitName);
    }
  }, [unitName]);

  return (
    <authContext.Provider value={{ unitName, setUnitName }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;