import React from "react";

function CardInfo({ title, data }) {
  return (
    <div className="min-w-[160px] px-4 bg-gradient-to-tr w-30 py-2 from-blue-700 to-purple-600 rounded-lg">
      <h3 className="mb-2 text-center text-xl font-bold tracking-tight text-[#D9D9D9]">
        {title}
      </h3>
      <h3 className="mb-2 text-center text-lg font-medium tracking-tight text-[#D9D9D9]">
        {data}
      </h3>
    </div>
  );
}

export default CardInfo;
