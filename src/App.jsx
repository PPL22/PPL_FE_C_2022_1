import React from 'react';
import axios from 'axios';
import config from './configs/config.json';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.js';
import { Home, Login } from './pages/pages.js';

function App() {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(true);

  // verify token
  // React.useEffect(() => {
  //   const verifyToken = async () => {
  //     try {
  //       const tokenUser = localStorage.getItem('token');
  //       if (tokenUser) {
  //         await axios.get(`${config.API_URL}/verify`, {
  //           headers: {
  //             'x-access-token': tokenUser,
  //           },
  //         });
  //         auth.setToken(tokenUser);
  //       }
  //     } catch (error) {
  //       if (error.response.status === 401) {
  //         auth.logout();
  //       }
  //       throw error;
  //     }
  //   };
  //   verifyToken();
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 500);
  // }, [auth, auth.token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
