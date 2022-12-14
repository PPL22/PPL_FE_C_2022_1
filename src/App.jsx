import React from "react";
import {
  Login,
  Dashboard,
  StatusIRSMahasiswa,
  StatusKHSMahasiswa,
  StatusSkripsiMahasiswa,
  StatusPKLMahasiswa,
  RekapPKLMahasiswa,
  RekapSkripsiMahasiswa,
  RekapStatusMahasiswa,
  DataMhs,
  Profile,
  Registration,
  NotFoundPage,
} from "./pages/pages";
import jwt_decode from "jwt-decode";
import { Header, Sidebar, Spinner, Toast } from "./components/components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useToast } from "./contexts/ToastContext";
import secureLocalStorage from "react-secure-storage";

function App() {
  const auth = useAuth();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // verify token
  React.useEffect(() => {
    const verifyToken = () => {
      setLoading(true);
      const firstTime = secureLocalStorage.getItem("firstTime");
      const token = secureLocalStorage.getItem("accessToken");
      const pathname = window.location.pathname;
      if (!token) {
        if (pathname !== "/") {
          auth.logout();
        }
      } else {
        try {
          const decoded = jwt_decode(token);
          if (decoded) {
            auth.updateRole(decoded);
            if (
              (pathname === "/register" || pathname === "/") &&
              firstTime === "false"
            ) {
              navigate("/dashboard");
            } else if (firstTime === "true" && pathname !== "/register") {
              navigate("/register");
            }
          }
        } catch (error) {
          auth.logout();
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, [auth.currentRole]);

  return (
    <>
      {loading ? (
        (auth.currentRole === null && auth.role)(
          <div className="h-screen flex justify-center items-center">
            <Spinner />
          </div>
        )
      ) : auth.role === null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <section className="grid grid-cols-12">
          <div className={`${auth.role && "col-span-2"} relative`}>
            {auth.firstTime === "false" && <Sidebar />}
          </div>
          <div
            className={`${
              auth.firstTime === "false"
                ? "col-span-10 ml-[32px]"
                : "col-span-12"
            } min-h-screen bg-background`}
          >
            {auth.firstTime === "false" && <Header />}
            <Routes>
              <Route path="/register" element={<Registration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              {auth.currentRole === "Dosen" && (
                <>
                  <Route
                    path="/dashboard/status/irs"
                    element={<StatusIRSMahasiswa />}
                  />
                  <Route
                    path="/dashboard/status/khs"
                    element={<StatusKHSMahasiswa />}
                  />
                  <Route
                    path="/dashboard/status/skripsi"
                    element={<StatusSkripsiMahasiswa />}
                  />
                  <Route
                    path="/dashboard/status/pkl"
                    element={<StatusPKLMahasiswa />}
                  />
                </>
              )}
              {(auth.currentRole === "Dosen" ||
                auth.currentRole === "Departemen") && (
                <>
                  <Route
                    path="/dashboard/rekap/status"
                    element={<RekapStatusMahasiswa />}
                  />
                  <Route
                    path="/dashboard/rekap/pkl"
                    element={<RekapPKLMahasiswa />}
                  />
                  <Route
                    path="/dashboard/rekap/skripsi"
                    element={<RekapSkripsiMahasiswa />}
                  />
                  <Route
                    path="/dashboard/data-mahasiswa"
                    element={<DataMhs />}
                  />
                </>
              )}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </section>
      )}
      {toast?.message && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

export default App;
