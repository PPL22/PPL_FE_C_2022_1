import React from 'react';

function OutlinedButton({
  loading = false,
  loadingState,
  child,
  type,
  onClick,
}) {
  return (
    <button
      className={`border border-blue-500 w-1/2 text-blue-600 py-3 rounded hover:bg-slate-600 hover:text-gray-100 ${
        loading && 'bg-slate-600 cursor-progress'
      }`}
      type={type}
      onClick={onClick}
      disabled={loading ? true : false}
    >
      {loading ? loadingState : child}
    </button>
  );
}

export default OutlinedButton;
