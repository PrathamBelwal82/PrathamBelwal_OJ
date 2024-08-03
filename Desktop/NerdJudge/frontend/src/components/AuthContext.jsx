import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');
    
    if (token && userId) {
      try {
        setUser({ loggedIn: true, token, userId });
      } catch (error) {
        console.error('Error parsing token from cookies:', error);
      }
    }
  }, []);

  const login = (token, userId) => {
    if (typeof token !== 'string') {
      console.error('Expected token to be a string but received:', token);
      return;
    }

    if (typeof userId !== 'string') {
      console.error('Expected userId to be a string but received:', userId);
      return;
    }
    
    Cookies.set('token', token, { expires: 15 });
    Cookies.set('userId', userId, { expires: 15 });
    setUser({ loggedIn: true, token, userId });
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
