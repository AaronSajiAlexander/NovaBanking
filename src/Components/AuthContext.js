import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsLoggedIn(true);
    
    console.log('isLoggedIn in authcontextfile',isLoggedIn)
    navigate('/home');
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    console.log('isLoggedIn in useEffect of authcontext', isLoggedIn);
  }, [isLoggedIn]);

  // useEffect(() => {
  //   // Redirect if not logged in
  //   if (!isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn, navigate]);
  console.log('result',isLoggedIn)
  
  return (
    <AuthContext.Provider value={{login,isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log('is Logged in value is useIsLoggedIn function',isLoggedIn)
  return isLoggedIn;
};
