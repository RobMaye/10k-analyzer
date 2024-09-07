import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Auto-login effect
  useEffect(() => {
    // Automatically set a mock user
    setUser({ email: 'user@example.com' });
  }, []);

  const login = (email, password) => {
    // For now, just set the user without any real authentication
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}