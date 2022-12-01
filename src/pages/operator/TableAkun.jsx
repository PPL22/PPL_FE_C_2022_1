import config from "../../configs/config.json";
import React from "react";
import { downloadExcel } from "../../utils/downloadExcel";
import { statusAktifColor } from "../../utils/statusAktifColor";
import { useToast } from "../../contexts/ToastContext";
import secureLocalStorage from "react-secure-storage";
import ToggleAkun from "./ToggleAkun";
function TableAkun({ dataAkun, title, akun, children }) {
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

  console.log(dataAkun);

  const updateStatusAkun = async (id, index) => {
    try {
      const apiUrl = config.API_URL;
      const token = secureLocalStorage.getItem("accessToken");
      const url = `${apiUrl}/operator/akun-${akun}/status-aktif/${id}`;
      const result = await fetch(url, {
        method: "PUT",
        headers: {
          "x-access-token": token,
        },
      });

      if (result.status === 200) {
        if (title === "mahasiswa") {
          dataAkun.tbody[index][9] = !dataAkun.tbody[index][9];
        } else if (title === "dosen") {
          dataAkun.tbody[index][5] = !dataAkun.tbody[index][5];
        }
        toast.setToast("Berhasil mengubah status akun", "success");
        return true;
      }
    } catch (error) {
      console.log(error);
      toast.setToast("Gagal mengubah status akun", "error");
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
      {children}
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
                {body.map((item, idx) => {
                  return (
                    <td key={idx} className="py-4 px-2">
                      <div
                        className={`${
                          title.includes("Mahasiswa") &&
                          idx === 8 &&
                          statusAktifColor(item)
                        } overflow-hidden text-ellipsis`}
                      >
                        {(akun === "mahasiswa" && idx === 9) ||
                        (akun === "dosen" && idx === 5) ? (
                          <ToggleAkun
                            item={item}
                            onChange={() => updateStatusAkun(body[2], index)}
                            value={item === "Aktif" ? true : false}
                          />
                        ) : (
                          item
                        )}
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
