import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const auth = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <p className="text-sm">Your role is {auth.role}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={auth.logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
