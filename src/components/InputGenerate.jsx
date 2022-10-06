import React from 'react';

function InputGenerate({ id, label, name, type, onClick }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="flex items-center bg-blue-50 rounded-lg border border-gray-300">
        <input
          type={type}
          id={id}
          placeholder={label}
          value={name}
          className="p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg focus:outline-none"
          required
          disabled
        />
        <button
          className={`bg-blue-500 text-gray-100 px-2 py-1 text-sm rounded hover:bg-slate-600 mr-2`}
          type={type}
          onClick={onClick}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default InputGenerate;
