import React from 'react';

export default function Keterangan({ color, child }) {
  return (
    <div className="p-1 flex gap-x-2">
      <div className={`${color} w-4 h-4`}></div>
      <div className="text-gray-500 text-sm">{child}</div>
    </div>
  );
}
