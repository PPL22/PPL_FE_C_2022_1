import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [firstTime, setFirstTime] = useState();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [foto, setFoto] = useState(null);

  // login
  const login = (data) => {
    secureLocalStorage.setItem("accessToken", data.accessToken);
    secureLocalStorage.setItem("refreshToken", data.refreshToken);
    secureLocalStorage.setItem("id", data.id);
    secureLocalStorage.setItem("name", data.nama);
    secureLocalStorage.setItem("foto", data.image);
    setId(data.id);
    setName(data.nama);
    setFoto(data.image);
    let role;
    if (Array.isArray(data.role)) {
      role = data.role.join(" ");
    } else {
      role = data.role;
    }
    setRole(role);
    secureLocalStorage.setItem("currentRole", role.split(" ")[0]);
    setCurrentRole(role.split(" ")[0]);
    if (data.firstTime) {
      secureLocalStorage.setItem("firstTime", "true");
      setFirstTime("true");
      navigate("/register");
    } else {
      secureLocalStorage.setItem("firstTime", "false");
      setFirstTime("false");
      navigate("/dashboard");
    }
  };

  // logout
  const logout = () => {
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("refreshToken");
    secureLocalStorage.removeItem("id");
    secureLocalStorage.removeItem("firstTime");
    secureLocalStorage.removeItem("currentRole");
    secureLocalStorage.removeItem("name");
    secureLocalStorage.removeItem("foto");
    setRole(null);
    setCurrentRole(null);
    setFoto(null);
    navigate("/");
  };

  // update role
  const updateRole = (data) => {
    let role = data.role;
    if (Array.isArray(data.role)) {
      role = role.join(" ");
    }

    setRole(role);
    setCurrentRole(secureLocalStorage.getItem("currentRole"));
    setFoto(secureLocalStorage.getItem("foto"));
    setId(secureLocalStorage.getItem("id"));
    setName(secureLocalStorage.getItem("name"));
    setFirstTime(secureLocalStorage.getItem("firstTime"));
  };

  // update current role
  const updateCurrentRole = (data) => {
    secureLocalStorage.setItem("currentRole", data);
    setCurrentRole(data);
  };

  return {
    role,
    currentRole,
    name,
    firstTime,
    id,
    foto,
    login,
    logout,
    updateRole,
    updateCurrentRole,
  };
}
