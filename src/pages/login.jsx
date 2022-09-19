import React from 'react';
import pic from './logo_undip.png';
// test
const Login = () => {
  return (
    <section className="h-screen flex flex-row">
      <div className="basis-1/2 bg-red-600"></div>
      <div className="basis-1/2 bg-gray-100 flex justify-center">
        <div className="pt-10 w-1/2">
          {/* header */}
          <div className="flex justify-center">
            <img className="mt-10 h-28" src={pic}></img>
          </div>
          <h1 className="mt-8 text-center">Aris App Beta 2.1</h1>
          <p className="mt-2 mb-16 text-center text-gray-400">
            Login to your account
          </p>
          {/* form */}
          <form className="flex flex-col space-y-6">
            <input
              className="bg-blue-50 p-2 rounded"
              type="email"
              placeholder="Email Address"
            ></input>
            <input
              className="bg-blue-50 p-2 rounded"
              type="password"
              placeholder="Password"
            ></input>
            <div className="pt-4 flex justify-center">
              <button
                className="bg-blue-500 w-1/2 text-gray-100 py-3 rounded hover:bg-slate-600"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
