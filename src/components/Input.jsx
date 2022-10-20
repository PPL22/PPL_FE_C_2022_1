import React from 'react';

function Input({
  id,
  label,
  type,
  innerRef,
  accept = '',
  disabled = false,
  defaultValue,
}) {
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
        className={`p-4 w-full text-sm ${
          disabled ? 'text-gray-500' : 'text-gray-900'
        } bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
        accept={accept}
        disabled={disabled}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}

export default Input;
