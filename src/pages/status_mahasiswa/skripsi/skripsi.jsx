import React from "react";
import { Spinner } from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusSkripsiMahasiswa from "./TableStatusSkripsiMahasiswa";

function StatusSkripsiMahasiswa({ isRekap = false, endpoint }) {
  const [dataSkripsi, setDataSkripsi] = React.useState({
    thead: [
      "No",
      "Nama Mahasiswa",
      "NIM",
      "Angkatan",
      "Semester",
      "Nilai Skripsi",
      "Lama Studi",
      "Tanggal Lulus",
      "Action",
      "Status",
    ],
    tbody: [],
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const getDataSkripsi = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = isRekap
        ? apiUrl + endpoint
        : `${apiUrl}/dosen/status-validasi/skripsi`;
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
            item.nilai,
            item.lamaStudi,
            item.tanggalLulusSidang,
          ],
          statusValidasi: item.statusValidasi,
          document: config.API_DOCUMENT_URL + "/skripsi/" + item.fileSkripsi,
        };
      });
      setDataSkripsi({
        ...dataSkripsi,
        tbody: result,
      });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDataSkripsi();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="mt-10 px-8">
      <h2 className="text-xl font-bold">Daftar Status Skripsi Mahasiswa</h2>
      <TableStatusSkripsiMahasiswa
        data={dataSkripsi}
        refreshData={getDataSkripsi}
        isRekap={isRekap}
      />
    </section>
  );
}

export default StatusSkripsiMahasiswa;
