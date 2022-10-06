import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.js';
import {
  Home,
  Login,
  Dashboard,
  DashboardMhs,
  StatusMahasiswa,
  UpdateDataMhs,
} from './pages/pages.js';
import jwt_decode from 'jwt-decode';
import { Header, Sidebar, Spinner } from './components/components';

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
    </BrowserRouter>
  );
}

export default App;
