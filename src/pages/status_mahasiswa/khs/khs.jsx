import React from "react";
import { Spinner } from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusKHSMahasiswa from "./TableStatusKHSMahasiswa";

function StatusKHSMahasiswa() {
  const [dataKHS, setDataKHS] = React.useState({
    thead: [
      "No",
      "Nama Mahasiswa",
      "NIM",
      "Angkatan",
      "Semester",
      "SKS Semester",
      "SKS Kumulatif",
      "IPs",
      "IPk",
      "Status Mahasiswa",
      "Action",
      "Status",
    ],
    tbody: [],
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const getDataKHS = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/dosen/status-validasi/khs`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data.map((item, index) => {
        return {
          data: [
            index + 1,
            item.nama,
            item.nim,
            item.angkatan,
            item.semester,
            item.jumlahSksSemester,
            item.jumlahSksKumulatif,
            item.ips,
            item.ipk,
            item.status,
          ],
          statusValidasi: item.statusValidasi,
          document: config.API_DOCUMENT_URL + "/khs/" + item.fileKhs,
        };
      });
      setDataKHS({
        ...dataKHS,
        tbody: result,
      });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDataKHS();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="mt-10 px-8">
      <h2 className="text-3xl font-bold">Daftar Status KHS Mahasiswa</h2>
      <TableStatusKHSMahasiswa data={dataKHS} refreshData={getDataKHS} />
    </section>
  );
}

export default StatusKHSMahasiswa;
