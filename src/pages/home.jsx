import React from 'react';

const Home = () => {
  const user = {
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome {user.username}</h1>
      <p className="text-sm">Your role is {user.role}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
