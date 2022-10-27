import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider() {
  const [role, setRole] = useState(null);
  const [firstTime, setFirstTime] = useState();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  // login
  const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("id", data.id);
    localStorage.setItem("firstTime", data.firstTime);
    localStorage.setItem("name", data.nama);
    localStorage.setItem("foto", data.image);
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
    if (role === "Mahasiswa" && data.firstTime) {
      setFirstTime("true");
      navigate("/register");
    } else {
      setFirstTime("false");
      navigate("/dashboard");
    }
  };

  // logout
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("firstTime");
    localStorage.removeItem("name");
    localStorage.removeItem("foto");
    setRole(null);
    setFoto(null);
    navigate("/");
  };

  // update role
  const updateRole = (data) => {
    let role = data.role;
    const firstTime = localStorage.getItem("firstTime");
    if (Array.isArray(data.role)) {
      role = role.join(" ");
    }
    setRole(role);
    setFoto(localStorage.getItem("foto"));
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setFirstTime(firstTime);
    if (role === "Mahasiswa" && firstTime === "true") {
      navigate("/register");
    }
  };

  return {
    role,
    name,
    firstTime,
    id,
    foto,
    login,
    logout,
    updateRole,
  };
}
