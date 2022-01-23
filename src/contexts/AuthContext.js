import React, { createContext, useState, useEffect } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState({ loading: true, data: null });

  const setTokenData = (data) => {
    setToken({data: data.token});
  };

  useEffect(() => {
    setToken({ loading: false, data: JSON.parse(window.localStorage.getItem('ggsToken'))});
  }, []);

  useEffect(() => {
    window.localStorage.setItem('ggsToken', JSON.stringify(token.data));
  }, [token.data]);

  return (
    <authContext.Provider value={{ token, setTokenData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;