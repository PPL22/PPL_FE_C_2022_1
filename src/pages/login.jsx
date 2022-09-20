import React from 'react';
import pic from '../assets/images/logo_undip.png';
import { FaEnvelope, FaKey } from 'react-icons/fa';

const Login = () => {
  return (
    <section className="h-screen grid grid-cols-12">
      <div className="hidden lg:block lg:col-span-7 bg-acintya-prasada bg-no-repeat bg-cover"></div>
      <div className="col-span-12 lg:col-span-5 bg-background flex justify-center items-center">
        <div className="">
          {/* header */}
          <div className="flex justify-center">
            <img alt="logo undip" className="mt-10 h-28" src={pic}></img>
          </div>
          <h1 className="mt-8 text-center font-medium">Aris App Beta 2.1</h1>
          <p className="mt-2 mb-4 text-center text-gray-400">
            Login to your account
          </p>
          {/* form */}
          <form className="flex flex-col w-full space-y-6">
            <label
              for="email-user"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Email
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FaEnvelope color=" #808080" />
              </div>
              <input
                type="email"
                id="email-user"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Email Address"
                required
              />
            </div>
            <label
              for="password-user"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FaKey color=" #808080" />
              </div>
              <input
                type="password"
                id="password-user"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Password"
                required
              />
            </div>
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
