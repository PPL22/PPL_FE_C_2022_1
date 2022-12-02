import React from "react";
import {
  Spinner,
  Dropdown,
  PaginationPage,
} from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusKHSMahasiswa from "./TableStatusKHSMahasiswa";
import { useAuth } from "../../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

function StatusKHSMahasiswa() {
  const auth = useAuth();
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

  const getDataKHS = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/dosen/status-validasi/khs`;
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
      setTotalPage(response.data.data.maxPage);
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDataKHS();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    getDataKHS();
  }, [page, limit, orderBy, isAscending]);

  const onClickHead = (value) => {
    let sorted = value.toLowerCase();
    if (sorted === "nama mahasiswa") {
      sorted = "nama";
    } else if (sorted === "sks semester") {
      sorted = "jumlahSksSemester";
    } else if (sorted === "sks kumulatif") {
      sorted = "jumlahSksKumulatif";
    } else if (sorted === "status mahasiswa") {
      sorted = "statusAktif";
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
      <h2 className="text-3xl font-bold">Daftar Status KHS Mahasiswa</h2>
      <TableStatusKHSMahasiswa
        onClickHead={onClickHead}
        currentFilter={currentFilter}
        data={dataKHS}
        refreshData={getDataKHS}
      />
      <div className="flex justify-between mt-2">
        <Dropdown
          label={"Tampilkan per baris"}
          id="tampilkan"
          defaultValue={limit}
          onChange={updateLimit}
          options={[
            { value: 5, label: "10 data" },
            { value: 10, label: "25 data" },
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
    </section>
  );
}

export default StatusKHSMahasiswa;
