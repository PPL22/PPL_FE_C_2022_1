import React from 'react';

function Input({ id, label, type, innerRef }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={label}
        ref={innerRef}
        className="p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        required
      />
    </div>
  );
}

export default Input;
