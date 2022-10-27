import React from "react";
import { Spinner } from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusPKLMahasiswa from "./TableStatusPKLMahasiswa";

function StatusPKLMahasiswa({ isRekap = false, endpoint }) {
  const [dataPkl, setDataPkl] = React.useState({
    thead: [
      "No",
      "Nama Mahasiswa",
      "NIM",
      "Angkatan",
      "Semester",
      "Nilai PKL",
      "Action",
      "Status",
    ],
    tbody: [],
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const getDataPkl = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = isRekap
        ? apiUrl + endpoint
        : `${apiUrl}/dosen/status-validasi/pkl`;
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
          ],
          statusValidasi: item.statusValidasi,
          document: config.API_DOCUMENT_URL + "/pkl/" + item.filePkl,
        };
      });
      setDataPkl({
        ...dataPkl,
        tbody: result,
      });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDataPkl();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="mt-10 px-8">
      <h2 className="text-xl font-bold">Daftar Status PKL Mahasiswa</h2>
      <TableStatusPKLMahasiswa
        isRekap={isRekap}
        data={dataPkl}
        refreshData={getDataPkl}
      />
    </section>
  );
}

export default StatusPKLMahasiswa;
