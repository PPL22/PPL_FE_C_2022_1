import React from "react";
import { Spinner } from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusIRSMahasiswa from "./TableStatusIRSMahasiswa";

function StatusIRSMahasiswa() {
  const [dataIRS, setDataIRS] = React.useState({
    thead: [
      "No",
      "Nama Mahasiswa",
      "NIM",
      "Angkatan",
      "Semester",
      "SKS Semester",
      "Status Mahasiswa",
      "Action",
      "Status",
    ],
    tbody: [],
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const getDataIRS = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/dosen/status-validasi/irs`;
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
            item.jumlahSks,
            item.status,
          ],
          statusValidasi: item.statusValidasi,
          document: config.API_DOCUMENT_URL + "/irs/" + item.fileIrs,
        };
      });
      setDataIRS({
        ...dataIRS,
        tbody: result,
      });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDataIRS();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="mt-10 px-8">
      <h2 className="text-3xl font-bold">Daftar Status IRS Mahasiswa</h2>
      <TableStatusIRSMahasiswa data={dataIRS} refreshData={getDataIRS} />
    </section>
  );
}

export default StatusIRSMahasiswa;
