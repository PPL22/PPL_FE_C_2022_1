import React from 'react';

function DangerAlert({ message }) {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
      role="alert"
    >
      {message}
    </div>
  );
}

export default DangerAlert;
