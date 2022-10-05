import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Login, Dashboard } from './pages/pages';
import jwt_decode from 'jwt-decode';
import { Spinner, Toast } from './components/components';
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
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      )}
      {toast?.message && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

export default App;
