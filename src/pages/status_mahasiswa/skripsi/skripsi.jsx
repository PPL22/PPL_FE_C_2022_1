import React from "react";
import {
  Spinner,
  Dropdown,
  PaginationPage,
} from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusSkripsiMahasiswa from "./TableStatusSkripsiMahasiswa";
import { useAuth } from "../../../contexts/AuthContext";

function StatusSkripsiMahasiswa({ isRekap = false, endpoint }) {
  const auth = useAuth();
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
  const [limit, setLimit] = React.useState(5);
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

  const getDataSkripsi = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = isRekap
        ? apiUrl + endpoint
        : `${apiUrl}/dosen/status-validasi/skripsi`;
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
      let startNumber = (page - 1) * limit + 1;
      const result = response.data.data.list.map((item) => {
        return {
          data: [
            startNumber++,
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
    getDataSkripsi();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    getDataSkripsi();
  }, [page, limit, orderBy, isAscending]);

  const onClickHead = (value) => {
    let sorted = value.toLowerCase();
    if (sorted === "nama mahasiswa") {
      sorted = "nama";
    } else if (sorted === "nilai skripsi") {
      sorted = "nilai";
    } else if (sorted === "lama studi") {
      sorted = "lamaStudi";
    } else if (sorted === "tanggal lulus") {
      sorted = "tanggalLulusSidang";
    } else if (sorted === "status") {
      sorted = "statusValidasi";
    }
    if (sorted === orderBy) {
      setIsAscending(!isAscending);
    } else {
      setOrderBy(sorted);
      setIsAscending(true);
      setCurrentFilter(value);
    }
  };

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="mt-10 px-8">
      <h2 className="text-xl font-bold">Daftar Status Skripsi Mahasiswa</h2>
      <TableStatusSkripsiMahasiswa
        onClickHead={onClickHead}
        currentFilter={currentFilter}
        data={dataSkripsi}
        refreshData={getDataSkripsi}
        isRekap={isRekap}
      />
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
          totalPage={totalPage}
          updatePage={updatePage}
        />
      </div>
    </section>
  );
}

export default StatusSkripsiMahasiswa;
