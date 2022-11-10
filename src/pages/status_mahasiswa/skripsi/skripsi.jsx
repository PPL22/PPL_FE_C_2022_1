import React from "react";
import {
  Spinner,
  Dropdown,
  PaginationPage,
} from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusSkripsiMahasiswa from "./TableStatusSkripsiMahasiswa";

function StatusSkripsiMahasiswa({
  isRekap = false,
  endpoint,
  updateRekapPage,
  pageRekap,
  totalPageRekap,
  updateLimitRekap,
}) {
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
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);
  const [limit, setLimit] = React.useState(10);

  const updatePage = (value) => {
    setPage(value);
    console.log(value);
  };

  const updateLimit = (value) => {
    setLimit(value);
    console.log(value);
  };

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
      <div className="flex justify-between mt-2">
        <Dropdown
          label={"Tampilkan"}
          id="tampilkan"
          defaultValue={limit}
          onChange={
            isRekap
              ? (value) => updateLimitRekap(value)
              : (value) => updateLimit(value)
          }
          options={[
            { value: 10, label: "10 data" },
            { value: 25, label: "25 data" },
            { value: 50, label: "50 data" },
            { value: 100, label: "100 data" },
            { value: "Semua", label: "Semua data" },
          ]}
        />
        {isRekap ? (
          <PaginationPage
            page={pageRekap}
            totalPage={totalPageRekap}
            updatePage={updateRekapPage}
          />
        ) : (
          <PaginationPage
            page={page}
            totalPage={totalPage}
            updatePage={updatePage}
          />
        )}
      </div>
    </section>
  );
}

export default StatusSkripsiMahasiswa;
