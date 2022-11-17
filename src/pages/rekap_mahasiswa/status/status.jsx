import React from "react";
import {
  Spinner,
  Dropdown,
  PaginationPage,
} from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { statusAktifColor } from "../../../utils/statusAktifColor";

function RekapStatusMahasiswa() {
  const auth = useAuth();
  const [rekapStatus, setRekapStatus] = React.useState({
    thead: [
      "Angkatan",
      "Aktif",
      "Mangkir",
      "Cuti",
      "Dropout",
      "Undur Diri",
      "Lulus",
      "Meninggal Dunia",
    ],
    tbody: [],
  });
  const [daftarStatus, setDaftarStatus] = React.useState({
    thead: [
      "No",
      "Nama Mahasiswa",
      "NIM",
      "Angkatan",
      "IP Kumulatif",
      "SKS Kumulatif",
      "Status Mahasiswa",
    ],
    tbody: [],
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const [totalPage, setTotalPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState("nim");
  const [currentFilter, setCurrentFilter] = React.useState("nim");
  const [isAscending, setIsAscending] = React.useState(true);

  const updatePage = (value) => {
    setPage(value);
  };

  const updateLimit = (value) => {
    setLimit(value);
    setPage(1);
  };

  const getRekapStatus = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth?.role.includes("Departemen") ? "departemen" : "dosen"
      }/rekap/status`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data.map((item) => {
        return {
          data: [
            item.angkatan,
            item.aktif,
            item.mangkir,
            item.cuti,
            item.dropout,
            item.undurDiri,
            item.lulus,
            item.meninggalDunia,
          ],
        };
      });
      setRekapStatus({
        ...rekapStatus,
        tbody: result,
      });
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const getDaftarStatus = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth?.role.includes("Departemen") ? "departemen" : "dosen"
      }/daftar-status`;
      const response = await axios.get(url, {
        params: {
          page: page,
          qty: limit,
          sortBy: orderBy,
          order: isAscending ? "asc" : "desc",
        },
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response.data);
      let startNumber = (page - 1) * limit + 1;
      const result = response.data.data.list.map((item, index) => {
        return {
          data: [
            startNumber++,
            item.nama,
            item.nim,
            item.angkatan,
            item.ipk,
            item.jumlahSksKumulatif,
            item.statusAktif,
          ],
        };
      });
      setDaftarStatus({
        ...daftarStatus,
        tbody: result,
      });
      setTotalPage(response.data.data.maxPage);
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getRekapStatus();
    getDaftarStatus();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    getDaftarStatus();
  }, [page, limit, orderBy, isAscending]);

  const onClickHead = (value) => {
    let sorted = value.toLowerCase();
    if (sorted === "nama mahasiswa") {
      sorted = "nama";
    } else if (sorted === "sks kumulatif") {
      sorted = "jumlahSksKumulatif";
    } else if (sorted === "status mahasiswa") {
      sorted = "statusAktif";
    } else if (sorted === "ip kumulatif") {
      sorted = "ipk";
    }

    if (sorted === orderBy) {
      setIsAscending(!isAscending);
    } else {
      setOrderBy(sorted);
      setIsAscending(true);
      setCurrentFilter(value);
    }
  };

  return (
    <div className="overflow-x-auto relative my-10">
      <h1 className="text-center font-bold text-xl mb-8">
        Rekap Status Mahasiswa Informatika Fakultas Sains dan Matematika UNDIP
        SEMARANG
      </h1>
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="px-4">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-gray-500 text-center table-fixed">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {rekapStatus.thead.map((item, index) => {
                    return (
                      <th scope="col" className="py-3 px-6" key={index}>
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rekapStatus.tbody.map((body, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {body.data.map((item, index) => {
                      return (
                        <td key={index} className="py-4 px-2">
                          {item}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
            <h2 className="text-xl font-bold mb-6">
              Daftar Status Aktif Mahasiswa
            </h2>
            <table className="w-full text-sm text-gray-500 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {daftarStatus.thead.map((item, index) => {
                    return (
                      <th scope="col" className="py-3 px-6" key={index}>
                        {item === "Action" || item === "No" ? (
                          item
                        ) : (
                          <button
                            className="flex justify-center items-center gap-x-2 mx-auto"
                            onClick={() => onClickHead(item)}
                          >
                            {item}
                            {currentFilter.toLowerCase() ===
                              item.toLowerCase() && (
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
                {daftarStatus.tbody.map((body, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {body.data.map((item, index) => {
                      return (
                        <td key={index} className="py-4 px-2">
                          <div
                            className={`${
                              index === 6 && statusAktifColor(item)
                            }`}
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
            <div className="flex justify-between mt-2">
              <Dropdown
                label={"Tampilkan per baris"}
                id="tampilkan"
                defaultValue={limit}
                onChange={updateLimit}
                options={[
                  { value: 5, label: "5 data" },
                  { value: 10, label: "10 data" },
                  { value: 25, label: "25 data" },
                  { value: 50, label: "50 data" },
                  { value: 100, label: "100 data" },
                ]}
              />
              <PaginationPage
                currentPage={page}
                updatePage={updatePage}
                totalPage={totalPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RekapStatusMahasiswa;
