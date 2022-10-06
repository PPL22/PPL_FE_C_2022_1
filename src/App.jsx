import React from 'react';
import {
  Login,
  Dashboard,
  DashboardMhs,
  StatusMahasiswa,
  UpdateDataMhs,
} from './pages/pages';
import jwt_decode from 'jwt-decode';
import { Header, Sidebar, Spinner, Toast } from './components/components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useToast } from './contexts/ToastContext';

function App() {
  const auth = useAuth();
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  // verify token
  React.useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem('accessToken');
      const pathname = window.location.pathname;
      if (!token) {
        if (pathname !== '/') {
          auth.logout();
        }
      } else {
        const decoded = jwt_decode(token);
        if (decoded) {
          auth.updateRole(decoded.role);
          if (pathname === '/') {
            navigate('/dashboard');
          }
        } else {
          auth.logout();
        }
      }
    };
    verifyToken();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  console.log(toast);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <section className="grid grid-cols-12">
          <div className="col-span-2 relative">
            <Sidebar />
          </div>
          <div className="col-span-10 min-h-screen bg-background ml-[32px]">
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<UpdateDataMhs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard-mhs" element={<DashboardMhs />} />
              <Route path="/dashboard/status" element={<StatusMahasiswa />} />
            </Routes>
          </div>
        </section>
      )}
      {toast?.message && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

export default App;
