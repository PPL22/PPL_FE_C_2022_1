import config from "../../configs/config.json";
import React from "react";
import { downloadExcel } from "../../utils/downloadExcel";
import { statusAktifColor } from "../../utils/statusAktifColor";
import { useToast } from "../../contexts/ToastContext";
import secureLocalStorage from "react-secure-storage";
import ToggleAkun from "./ToggleAkun";
function TableAkun({
  dataAkun,
  title,
  akun,
  children,
  onClickHead,
  currentFilter,
}) {
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
        <table className="w-full text-sm text-gray-500 text-center table-auto">
          <thead className="text-xs text-gray-700  bg-gray-50">
            <tr>
              {dataAkun.thead.map((item, index) => {
                return (
                  <th scope="col" className="py-3 px-6" key={index}>
                    {item.toLowerCase() === "action" ||
                    item.toLowerCase() === "no" ||
                    item.toLowerCase() === "username" ||
                    item.toLowerCase() === "password" ? (
                      item
                    ) : (
                      <button
                        className="flex justify-center items-center gap-x-2 mx-auto"
                        onClick={() => onClickHead(item)}
                      >
                        {item}
                        {currentFilter.toLowerCase() === item.toLowerCase() && (
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 5.1665H2C1.72667 5.1665 1.5 4.93984 1.5 4.6665C1.5 4.39317 1.72667 4.1665 2 4.1665H14C14.2733 4.1665 14.5 4.39317 14.5 4.6665C14.5 4.93984 14.2733 5.1665 14 5.1665Z"
                              fill="#00092E"
                            />
                            <path
                              d="M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z"
                              fill="#00092E"
                            />
                            <path
                              d="M9.33366 11.8335H6.66699C6.39366 11.8335 6.16699 11.6068 6.16699 11.3335C6.16699 11.0602 6.39366 10.8335 6.66699 10.8335H9.33366C9.60699 10.8335 9.83366 11.0602 9.83366 11.3335C9.83366 11.6068 9.60699 11.8335 9.33366 11.8335Z"
                              fill="#00092E"
                            />
                          </svg>
                        )}
                      </button>
                    )}
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
