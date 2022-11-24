import config from "../../configs/config.json";
import React from "react";
import { downloadExcel } from "../../utils/downloadExcel";
import { statusAktifColor } from "../../utils/statusAktifColor";
import { useToast } from "../../contexts/ToastContext";

function TableAkun({ dataAkun, title, akun }) {
  const toast = useToast();
  const handleCetak = async () => {
    const apiUrl = config.API_URL;
    const url = `${apiUrl}/operator/akun-${akun}/cetak`;
    const result = await downloadExcel(url, "Daftar Akun " + akun);
    if (result === "success") {
      toast.setToast("Berhasil mendownload file", "success");
    } else {
      toast.setToast("Gagal mendownload file", "error");
    }
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>

        <button
          onClick={() => handleCetak()}
          className="border border-blue-500 hover:bg-blue-700 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
        >
          Cetak
        </button>
      </div>
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
