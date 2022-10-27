import React from "react";

function IndicatorButton({
  name,
  isActive = false,
  isAvailable = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`text-base font-medium text-grey-900 border-b-4 cursor-pointer relative capitalize ${
        isActive
          ? "border-b-purple-500 text-purple-900"
          : "border-b-transparent"
      }`}
    >
      {!isAvailable && (
        <div className="w-2 h-2 absolute top-0 -right-2 rounded-full bg-red-600"></div>
      )}
      {name}
    </button>
  );
}

export default IndicatorButton;
