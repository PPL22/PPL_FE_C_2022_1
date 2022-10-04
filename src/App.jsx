import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.js';
import { Home, Login, Dashboard } from './pages/pages.js';
import jwt_decode from 'jwt-decode';
import { Spinner } from './components/components';

function App() {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);

  // verify token
  // React.useEffect(() => {
  //   const verifyToken = () => {
  //     const token = localStorage.getItem('accessToken');
  //     const pathname = window.location.pathname;
  //     if (!token) {
  //       if (pathname !== '/') {
  //         auth.logout();
  //       }
  //     } else {
  //       const decoded = jwt_decode(token);
  //       if (decoded) {
  //         auth.updateRole(decoded.role);
  //         if (pathname === '/') {
  //           window.location.href = '/dashboard';
  //         }
  //       } else {
  //         auth.logout();
  //       }
  //     }
  //   };
  //   verifyToken();
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // }, [auth]);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
