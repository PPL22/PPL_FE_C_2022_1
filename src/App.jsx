import React from 'react';
import {
  Login,
  Dashboard,
  StatusIRSMahasiswa,
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
  const firstTime = localStorage.getItem('firstTime');

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
          auth.updateRole(decoded);
          if (
            (pathname === '/register' || pathname === '/') &&
            firstTime === 'false'
          ) {
            navigate('/dashboard');
          }
        } else {
          auth.logout();
        }
      }
    };
    setLoading(true);
    verifyToken();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <section className="grid grid-cols-12">
          <div className={`${auth.role && 'col-span-2'} relative`}>
            {auth.role && auth.firstTime === 'false' && <Sidebar />}
          </div>
          <div
            className={`${
              auth.role && auth.firstTime === 'false'
                ? 'col-span-10 ml-[32px]'
                : 'col-span-12'
            } min-h-screen bg-background`}
          >
            {auth.role && auth.firstTime === 'false' && <Header />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<UpdateDataMhs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {auth.role?.includes('Dosen') && (
                <Route
                  path="/dashboard/status/irs"
                  element={<StatusIRSMahasiswa />}
                />
              )}
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </section>
      )}
      {toast?.message && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

export default App;
