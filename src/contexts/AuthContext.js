import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  // login
  const login = (data) => {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('id', data.id);
    localStorage.setItem('name', data.nama);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setId(data.id);
    setName(data.nama);
    let role;
    if (Array.isArray(data.role)) {
      role = data.role.join(' ');
    } else {
      role = data.role;
    }
    setRole(role);
    navigate('/dashboard');
  };

  // logout
  const logout = () => {
    console.log('logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setRole(null);
    navigate('/');
  };

  // update role
  const updateRole = (role) => {
    if (Array.isArray(role)) {
      role = role.join(' ');
    }
    setRole(role);
    setId(localStorage.getItem('id'));
    setName(localStorage.getItem('name'));
  };

  return {
    accessToken,
    refreshToken,
    role,
    name,
    id,
    login,
    logout,
    updateRole,
  };
}
