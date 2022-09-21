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
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [role, setRole] = useState(null);

  // login
  const login = (data) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setAccessToken(data.accessToken);
    setRole(data.role);
    setRefreshToken(data.refreshToken);
    window.location.href = '/dashboard';
  };

  // logout
  const logout = () => {
    console.log('logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    window.location.href = '/';
  };

  // update role
  const updateRole = (role) => {
    setRole(role);
  };

  return { accessToken, refreshToken, role, login, logout, updateRole };
}
