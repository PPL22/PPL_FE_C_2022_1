import React from "react";

function ProgressBarSemester({
  semester,
  jumlahSks,
  isActive = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`border p-2 rounded-lg ${
        isActive ? "border-purple-500" : "border-transparent"
      } `}
    >
      <p
        className={`text-base text-left font-medium ${
          isActive && "text-purple-900"
        }`}
      >
        Semester {semester}
      </p>
      <div className="flex items-center gap-x-2">
        <div className="w-full bg-gray-300 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full ${
              jumlahSks === 0 ? "bg-blue-300" : "bg-blue-500"
            }`}
            style={{ width: (jumlahSks / 24) * 100 + "%" }}
          />
        </div>
        <p>{jumlahSks}</p>
      </div>
    </button>
  );
}

export default ProgressBarSemester;
