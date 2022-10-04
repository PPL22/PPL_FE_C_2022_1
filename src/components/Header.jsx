import React from 'react';
import logoUndip from '../assets/icons/logo_undip_name.png';

function Header() {
  return (
    <header>
      <div className="flex justify-between items-center bg-white h-24 px-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <img alt="logo undip" src={logoUndip} width={180} />
      </div>
      <nav className="flex mt-4 px-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/dashboard"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Dashboard
            </a>
          </li>
        </ol>
      </nav>
    </header>
  );
}

export default Header;
