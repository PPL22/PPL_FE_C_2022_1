import React from 'react';

function BtnSemester({ status, child }) {
  let statusColor =
    'bg-white border border-gray-700 text-grey-900 hover:text-white';
  if (status == 'irs') {
    statusColor = 'bg-blue-500 text-gray-100';
  } else if (status == 'pkl') {
    statusColor = 'bg-yellow-300 text-gray-100';
  } else if (status == 'skripsi') {
    statusColor = 'bg-green-500 text-gray-100';
  } else if (status == 'cuti') {
    statusColor = 'bg-red-500 text-gray-100';
  }
  return (
    <button
      className={`${statusColor} w-full px-6 py-1 rounded-lg hover:bg-slate-600
      `}
    >
      {child}
    </button>
  );
}

export default BtnSemester;
