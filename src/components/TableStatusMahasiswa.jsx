import React from 'react';

function TableStatusMahasiswa({ data }) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
      <table className="w-full text-sm text-gray-500 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {data.thead.map((item, index) => {
              return (
                <th scope="col" className="py-3 px-6" key={index}>
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.tbody.map((body, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              {body.data.map((item, index) => {
                return (
                  <td key={index} className="py-4 px-2">
                    {item}
                  </td>
                );
              })}
              {body.status !== 'Sudah Entry' ? (
                <td className="flex justify-center items-center py-4 px-6 space-x-3">
                  <button className="font-medium text-white bg-blue-500 hover:bg-blue-800 p-2 rounded">
                    Validasi
                  </button>
                </td>
              ) : (
                <td></td>
              )}
              <td key={index} className="py-4 px-6">
                {body.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableStatusMahasiswa;
