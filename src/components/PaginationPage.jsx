import React from "react";

function PaginationPage({ currentPage, updatePage, totalPage }) {
  const prevPage = () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPage) {
      updatePage(currentPage + 1);
    }
  };

  return (
    <div className="flex gap-x-5 items-center">
      <button
        onClick={prevPage}
        className={`
          font-semibold rounded-md px-4 py-2
          ${
            currentPage === 1
              ? "border border-blue-500 text-gray-900"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }
        `}
      >
        Prev
      </button>
      <span className="text-gray-800">
        <strong>{currentPage}</strong> dari {totalPage}
      </span>
      <button
        onClick={nextPage}
        className={`
          font-semibold rounded-md px-4 py-2
          ${
            currentPage === totalPage
              ? "border border-blue-500 text-gray-900"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }
        `}
      >
        Next
      </button>
    </div>
  );
}

export default PaginationPage;
