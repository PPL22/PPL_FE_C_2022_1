import React from "react";
import {
  Spinner,
  Dropdown,
  PaginationPage,
} from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import TableStatusIRSMahasiswa from "./TableStatusIRSMahasiswa";
import { useAuth } from "../../../contexts/AuthContext";

function StatusIRSMahasiswa() {
  const auth = useAuth();
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
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const [totalPage, setTotalPage] = React.useState(10);
  const [orderBy, setOrderBy] = React.useState("nim");
  const [currentFilter, setCurrentFilter] = React.useState("nim");
  const [isAscending, setIsAscending] = React.useState(true);

  const updatePage = (value) => {
    setPage(value);
    console.log(value);
  };
  const getDataIRS = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/dosen/status-validasi/irs`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
        params: {
          page: page,
          qty: limit,
          sortBy: orderBy,
          order: isAscending ? "asc" : "desc",
        },
      });
      let startNumber = (page - 1) * limit + 1;
      const result = response.data.data.irs.map((item) => {
        return {
          data: [
            startNumber++,
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
    getDataIRS();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    getDataIRS();
  }, [page, limit, orderBy, isAscending]);

  const onClickHead = (value) => {
    let sorted = value.toLowerCase();
    if (sorted === "nama mahasiswa") {
      sorted = "nama";
    } else if (sorted === "sks semester") {
      sorted = "jumlahSks";
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
      <h2 className="text-3xl font-bold">Daftar Status IRS Mahasiswa</h2>
      <TableStatusIRSMahasiswa
        onClickHead={onClickHead}
        currentFilter={currentFilter}
        data={dataIRS}
        refreshData={getDataIRS}
      />
      <div className="flex justify-between mt-2">
        <Dropdown
          label={"Tampilkan per baris"}
          id="tampilkan"
          defaultValue={limit}
          onChange={setLimit}
          options={[
            { value: 5, label: "5 data" },
            { value: 10, label: "10 data" },
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

export default StatusIRSMahasiswa;
