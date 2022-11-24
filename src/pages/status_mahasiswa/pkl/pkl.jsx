import React from "react";
import {
  Spinner,
  Dropdown,
  PaginationPage,
} from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusPKLMahasiswa from "./TableStatusPKLMahasiswa";
import { useAuth } from "../../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";
import { downloadExcel } from "../../../utils/downloadExcel";
import { useToast } from "../../../contexts/ToastContext";

function StatusPKLMahasiswa({ isRekap = false, endpoint }) {
  const auth = useAuth();
  const toast = useToast();
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

  const getDataPkl = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = isRekap
        ? apiUrl + endpoint
        : `${apiUrl}/dosen/status-validasi/pkl`;
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
          ],
          statusValidasi: item.statusValidasi,
          document: config.API_DOCUMENT_URL + "/pkl/" + item.filePkl,
        };
      });
      setDataPkl({
        ...dataPkl,
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
    getDataPkl();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    getDataPkl();
  }, [page, limit, orderBy, isAscending]);

  const onClickHead = (value) => {
    let sorted = value.toLowerCase();
    if (sorted === "nama mahasiswa") {
      sorted = "nama";
    } else if (sorted === "nilai pkl") {
      sorted = "nilai";
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

  const handleCetak = async () => {
    const apiUrl = config.API_URL;
    const url = `${apiUrl}/${
      auth.currentRole === "Dosen" ? "dosen" : "departemen"
    }/daftar-pkl/cetak`;
    const result = await downloadExcel(url, "daftar pkl");
    if (result === "success") {
      toast.setToast("Berhasil mendownload file", "success");
    } else {
      toast.setToast("Gagal mendownload file", "error");
    }
  };

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="mt-10 px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Daftar Status PKL Mahasiswa</h2>
        {isRekap && (
          <button
            onClick={() => handleCetak()}
            className="border border-blue-500 hover:bg-blue-700 text-gray-900 hover:text-white font-bold py-2 px-4 rounded"
          >
            Cetak
          </button>
        )}
      </div>
      <TableStatusPKLMahasiswa
        onClickHead={onClickHead}
        currentFilter={currentFilter}
        isRekap={isRekap}
        data={dataPkl}
        refreshData={getDataPkl}
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

export default StatusPKLMahasiswa;
