import React from 'react';

function Button({ loading = false, loadingState, child, type }) {
  return (
    <button
      className={`bg-blue-500 w-1/2 text-gray-100 py-3 rounded hover:bg-slate-600 ${
        loading && 'bg-slate-600 cursor-progress'
      }`}
      type={type}
      disabled={loading ? true : false}
    >
      {loading ? loadingState : child}
    </button>
  );
}

export default Button;
