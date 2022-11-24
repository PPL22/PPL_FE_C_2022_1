import React from "react";
import { statusAktifColor } from "../../utils/statusAktifColor";

function TableAkun({ dataAkun, title }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-gray-500 text-center table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {dataAkun.thead.map((item, index) => {
                return (
                  <th className="py-3 px-6" key={index}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataAkun.tbody.map((body, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                {body.map((item, index) => {
                  return (
                    <td key={index} className="py-4 px-2">
                      <div
                        className={`${
                          index === 8 && statusAktifColor(item)
                        } overflow-hidden text-ellipsis`}
                      >
                        {item}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TableAkun;
