import React from 'react';

function BtnSemester({ status, child, onClick }) {
  let isClicked = false;
  let statusColor =
    'bg-white border border-gray-700 text-grey-900 cursor-default';
  if (status === 'irskhs') {
    isClicked = true;
    statusColor =
      'bg-blue-500 text-gray-100 hover:bg-blue-600 hover:text-white';
  } else if (status === 'pkl') {
    isClicked = true;
    statusColor =
      'bg-yellow-300 text-gray-100 hover:bg-yelloy-600 hover:text-white';
  } else if (status === 'skripsi') {
    isClicked = true;
    statusColor =
      'bg-green-500 text-gray-100 hover:bg-green-800 hover:text-white';
  } else if (status === 'cuti') {
    isClicked = true;
    statusColor = 'bg-red-500 text-gray-100 hover:bg-red-600 hover:text-white';
  }
  return (
    <button
      className={`${statusColor} w-full px-6 py-1 rounded-lg 
      `}
      onClick={isClicked ? onClick : null}
    >
      {child}
    </button>
  );
}

export default BtnSemester;
