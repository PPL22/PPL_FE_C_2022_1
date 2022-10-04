import React from 'react';

function Dropdown({ label, id, options }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        id={id}
        name={id}
        defaultValue=""
        className="block w-full p-4 text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      >
        <option className="p-4 text-gray-400" value="" disabled>
          {label}
        </option>
        {options.map((option, index) => {
          return (
            <option className="p-4" key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Dropdown;
