import React from 'react';

function BtnSemester({ status, child, onClick }) {
  let statusColor =
    'bg-white border border-gray-700 text-grey-900 cursor-default';
  if (status === 'irskhs') {
    statusColor =
      'bg-blue-500 text-gray-100 hover:bg-blue-600 hover:text-white';
  } else if (status === 'pkl') {
    statusColor =
      'bg-yellow-300 text-gray-100 hover:bg-yelloy-600 hover:text-white';
  } else if (status === 'skripsi') {
    statusColor =
      'bg-green-500 text-gray-100 hover:bg-green-800 hover:text-white';
  } else if (status === 'cuti') {
    statusColor = 'bg-red-500 text-gray-100 hover:bg-red-600 hover:text-white';
  }
  return (
    <button
      className={`${statusColor} w-full px-6 py-1 rounded-lg 
      `}
      onClick={onClick}
    >
      {child}
    </button>
  );
}

export default BtnSemester;
