import React from 'react';

function Button({ loading = false, lodaingState, child, type, onClick }) {
  return (
    <button
      className={`bg-blue-500 w-1/2 text-gray-100 py-3 rounded hover:bg-slate-600 ${
        loading && 'bg-slate-600 cursor-progress'
      }`}
      type={type}
      onClick={onClick}
      disabled={loading ? true : false}
    >
      {loading ? lodaingState : child}
    </button>
  );
}

export default Button;
