import config from "../configs/config.json";
import React from "react";
import {
  Charts,
  DangerAlert,
  Dropdown,
  PaginationPage,
  Spinner,
  Input,
} from "../components/components";
import axios from "axios";
import { TableAkun, EntryDataMahasiswa, EntryDataDosen } from "./pages";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

function Operator() {
  const toast = useToast();
  const auth = useAuth();
  const [modal, setModal] = React.useState(null);
  const [dataMahasiswa, setDataMahasiswa] = React.useState({});
  const [dataDosen, setDataDosen] = React.useState({});
  const [daftarDosen, setDaftarDosen] = React.useState([]);
  const [dataAkunMahasiswa, setDataAkunMahasiswa] = React.useState({
    thead: [
      "No",
      "Nama Mahasiswa",
      "NIM",
      "Username",
      "Password",
      "Angkatan",
      "Jalur Masuk",
      "Dosen Wali",
      "Status",
      "Action",
    ],
    tbody: [],
  });
  const [dataAkunDosen, setDataAkunDosen] = React.useState({
    thead: ["No", "Nama Dosen", "NIP", "Username", "Password"],
    tbody: [],
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [document, setDocument] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);
  const [limit, setLimit] = React.useState(5);
  const [toggleAkun, setToggleAkun] = React.useState("Mahasiswa");
  const [search, setSearch] = React.useState("");

  const updatePage = (value) => {
    setPage(value);
  };

  const updateLimit = (value) => {
    setLimit(value);
    setPage(1);
  };

  const getDataAkunMahasiswa = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/akun-mahasiswa`;
      const response = await axios.get(url, {
        params: {
          page: page,
          qty: limit,
          keyword: search,
        },
        headers: {
          "x-access-token": token,
        },
      });
      let startNumber = (page - 1) * limit + 1;
      const data = response.data.list.map((item) => {
        return [
          startNumber++,
          item.nama,
          item.nim,
          item.username,
          item.password,
          item.angkatan,
          item.jalurMasuk,
          item.namaDoswal,
          item.statusAktif,
          item.statusAkun,
        ];
      });
      setDataAkunMahasiswa({
        ...dataAkunMahasiswa,
        tbody: data,
      });
      setTotalPage(response.data.maxPage);
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const getDataAkunDosen = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/akun-dosen`;
      const response = await axios.get(url, {
        params: {
          page: page,
          qty: limit,
          keyword: search,
        },
        headers: {
          "x-access-token": token,
        },
      });
      let startNumber = (page - 1) * limit + 1;
      const data = response.data.list.map((item) => {
        return [
          startNumber++,
          item.nama,
          item.nip,
          item.username,
          item.password,
          item.statusAkun,
        ];
      });
      setDataAkunDosen({
        ...dataAkunDosen,
        tbody: data,
      });
      setTotalPage(response.data.maxPage);
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  function showModal(akun) {
    setModal(akun);
  }
  function closeModal() {
    setModal(null);
  }

  const getDaftarDosen = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/daftar-dosen`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const data = response.data.map((item) => {
        return {
          value: item.nip,
          label: item.nama,
        };
      });
      setDaftarDosen(data);
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const getDataMahasiswa = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/jumlah-akun-mahasiswa`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      setDataMahasiswa(response.data);
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const getDataDosen = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/jumlah-akun-dosen`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response.data);
      setDataDosen(response.data);
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const resetFileExcel = () => {
    setDocument(null);
  };

  const submitFileExcel = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    const form = new FormData();
    form.append("dokumen", document);
    try {
      setIsSubmitted(true);
      setErrorMessage("");
      const url = `${apiUrl}/operator/batch-add-mahasiswa`;
      const response = await axios.post(url, form, {
        headers: {
          "x-access-token": token,
        },
      });
      setDocument(null);
      toast.setToast(response.data.message, "success");
      refreshDataMahasiswa();
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      setErrorMessage(error.response.data.message);
      throw error;
    } finally {
      setIsSubmitted(false);
    }
  };

  const refreshDataMahasiswa = () => {
    setPage(1);
    setTotalPage(0);
    getDataAkunMahasiswa();
    getDataMahasiswa();
  };

  const refreshDataDosen = () => {
    setPage(1);
    setTotalPage(0);
    getDataAkunDosen();
    getDataDosen();
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDaftarDosen();
    getDataAkunMahasiswa();
    getDataDosen();
    getDataMahasiswa();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (toggleAkun === "Mahasiswa") {
      getDataAkunMahasiswa();
    } else {
      getDataAkunDosen();
    }
  }, [page, limit, search]);

  const handleToggleAkun = (akun) => {
    setToggleAkun(akun);
    setPage(1);
    setTotalPage(0);
    if (akun === "Mahasiswa") {
      getDataAkunMahasiswa();
    } else {
      getDataAkunDosen();
    }
  };

  const dashboardMahasiswa = {
    labels: ["Sudah Memiliki Akun", "Belum Memiliki Akun"],
    colors: ["#5570F1", "#FFCC91"],
    label: "Jumlah Mahasiswa",
    elements: [
      dataMahasiswa.sudahMemilikiAkun,
      dataMahasiswa.belumMemilikiAkun,
    ],
  };

  const dashboardDosen = {
    labels: ["Sudah Memiliki Akun", "Belum Memiliki Akun"],
    colors: ["#5570F1", "#FFCC91"],
    label: "Jumlah Dosen",
    elements: [dataDosen.sudahMemilikiAkun, dataDosen.belumMemilikiAkun],
  };

  return (
    <>
      {errorMessage && (
        <div className="flex justify-center">
          <DangerAlert message={errorMessage} />
        </div>
      )}
      <section className="flex justify-center gap-x-10">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Data Mahasiswa
            </h5>
          </div>
          <div className="flex gap-x-10">
            {dashboardMahasiswa && (
              <div className="max-w-xs mx-auto">
                <Charts data={dashboardMahasiswa} />
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-4 gap-x-4">
            <button
              className="flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              type="button"
              onClick={() => showModal("Mahasiswa")}
              data-modal-toggle="entry-data-modal"
            >
              Entry Data
            </button>
            {document ? (
              <div className="flex items-center bg-blue-50 px-2 rounded-lg">
                <p className="mr-2">{document.name}</p>
                <button
                  className={`mr-2 py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${
                    isSubmitted && "bg-slate-600"
                  }`}
                  onClick={submitFileExcel}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? "Loading" : "Submit"}
                </button>
                <button
                  className={`py-2 px-3 text-sm font-medium text-center text-gray-900 border border-red-700 rounded-lg ${
                    !isSubmitted && "hover:text-red-800"
                  }`}
                  onClick={resetFileExcel}
                >
                  Reset
                </button>
              </div>
            ) : (
              <>
                <input
                  onChange={(e) => {
                    setDocument(e.target.files[0]);
                  }}
                  id="file-skripsi"
                  type="file"
                  hidden
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <label
                  className="flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                  htmlFor="file-skripsi"
                >
                  Input File Excel
                </label>
              </>
            )}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Data Dosen
            </h5>
          </div>
          <div className="flex gap-x-10">
            {dashboardDosen && (
              <div className="max-w-xs mx-auto">
                <Charts data={dashboardDosen} />
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-4 gap-x-4">
            <button
              className="flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              type="button"
              onClick={() => showModal("Dosen")}
              data-modal-toggle="entry-data-modal"
            >
              Entry Data
            </button>
          </div>
        </div>
      </section>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="mt-10 mx-10">
          <div className="flex gap-x-8 justify-center">
            <button
              onClick={() => handleToggleAkun("Mahasiswa")}
              className={`font-semibold border border-blue-500 px-4 py-3 rounded hover:text-gray-100 hover:bg-blue-500 ${
                toggleAkun === "Mahasiswa"
                  ? "bg-blue-500 text-gray-100"
                  : "text-gray-900"
              }`}
            >
              Daftar Akun Mahasiswa
            </button>

            <button
              onClick={() => handleToggleAkun("Dosen")}
              className={`font-semibold border border-blue-500 px-4 py-3 rounded hover:text-gray-100 hover:bg-blue-500 ${
                toggleAkun === "Dosen"
                  ? "bg-blue-500 text-gray-100"
                  : "text-gray-900"
              }`}
            >
              Daftar Akun Dosen
            </button>
          </div>
          <TableAkun
            dataAkun={
              toggleAkun === "Mahasiswa" ? dataAkunMahasiswa : dataAkunDosen
            }
            title={
              toggleAkun === "Mahasiswa"
                ? "Daftar Akun Mahasiswa"
                : "Daftar Akun Dosen"
            }
            akun={toggleAkun.toLowerCase()}
            children={
              <div className="w-52">
                <Input
                  id="search"
                  type="text"
                  label="Cari Akun"
                  value={search}
                  moreProps={{
                    onChange: (e) => setSearch(e.target.value),
                  }}
                />
              </div>
            }
          />
          <div className="flex justify-between mt-2">
            <Dropdown
              label={"Tampilkan per baris"}
              id="tampilkan"
              defaultValue={limit}
              onChange={(value) => updateLimit(value)}
              options={[
                { value: 5, label: "5 data" },
                { value: 10, label: "10 data" },
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
      )}

      {modal !== null &&
        (modal === "Mahasiswa" ? (
          <EntryDataMahasiswa
            onClick={closeModal}
            dataDosen={daftarDosen}
            refreshData={refreshDataMahasiswa}
          />
        ) : (
          <EntryDataDosen onClick={closeModal} refreshData={refreshDataDosen} />
        ))}
    </>
  );
}

export default Operator;
