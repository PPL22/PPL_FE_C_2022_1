import React from 'react';

function DropdownSearch({ id, label, type, options }) {
  return (
    <div className="relative">
      <div className="w-full h-24">
        <label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </label>
        <input type="hidden" value="" />
        <input
          type={type}
          id={id}
          placeholder={label}
          className="p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="relative -top-4 left-0 right-0">
        <ul className="bg-blue-50 border border-gray-300 rounded-lg">
          {options.map((option, index) => {
            return (
              <li
                key={index}
                className="p-4 text-gray-900 hover:bg-gray-100 text-sm"
              >
                {option}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DropdownSearch;
