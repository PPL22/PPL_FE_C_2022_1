import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider() {
  const [token, setToken] = useState(null);

  // login
  const login = (tokenUser) => {
    localStorage.setItem('token', tokenUser);
    setToken(tokenUser);
  };

  // logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.reload();
  };

  return { token, setToken, login, logout };
}
