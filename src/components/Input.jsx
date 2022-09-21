import React from 'react';

function Input(
  // className
  { type, placeHolder }
) {
  return (
    <input
      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      type={`${type}`}
      placeholder={`${placeHolder}`}
    />
  );
}

export default Input;
