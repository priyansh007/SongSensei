import React, { createContext, useContext, useState } from 'react';

// Create a context
const AccessTokenContext = createContext();

// Create a provider component
export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  const updateAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
  };

  return (
    <AccessTokenContext.Provider value={{ accessToken, updateAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

// Custom hook to consume the context
export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};