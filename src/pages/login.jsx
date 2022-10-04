import React from 'react';
import axios from 'axios';
import config from '../configs/config.json';
import pic from '../assets/images/logo_undip.png';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { DangerAlert } from '../components/components';

const Login = () => {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { register, handleSubmit } = useForm();
  // const { login } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${config.API_URL}/login`;
      const response = await axios.post(url, data);
      if (response) {
        const data = response.data;
        auth.login(data);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen grid grid-cols-12">
      <div className="hidden md:block md:col-span-7 bg-acintya-prasada bg-no-repeat bg-cover"></div>
      <div className="col-span-12 md:col-span-5 bg-background flex justify-center items-center">
        <div className="">
          {/* header */}
          <div className="flex justify-center">
            <img alt="logo undip" className="mt-10 h-28" src={pic}></img>
          </div>
          <h1 className="mt-8 text-center font-medium">G-SIAP 2.5</h1>
          <p className="mt-2 mb-4 text-center text-gray-400">
            Login to your account
          </p>
          {/* alert */}
          {error && <DangerAlert message={error} />}
          {/* form */}
          <form
            className="flex flex-col w-full space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              htmlFor="username"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Username
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <FaEnvelope color=" #808080" />
              </div>
              <input
                type="text"
                id="username"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Username"
                required
                {...register('username', { required: true })}
              />
            </div>
            <label
              htmlFor="password-user"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
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
                {...register('password', { required: true })}
              />
            </div>
            <div className="pt-4 flex justify-center">
              <button
                className={`bg-blue-500 w-1/2 text-gray-100 py-3 rounded hover:bg-slate-600 ${
                  loading && 'bg-slate-600 cursor-progress'
                }`}
                type="submit"
                disabled={loading ? true : false}
              >
                {loading ? (
                  <div>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
