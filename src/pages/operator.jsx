import config from "../configs/config.json";
import React from "react";
import {
  Charts,
  DangerAlert,
  EntryData,
  Input,
  Spinner,
} from "../components/components";
import axios from "axios";
import { TableAkunMahasiswa } from "./pages";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "../contexts/AuthContext";

function Operator() {
  const toast = useToast();
  const auth = useAuth();
  const [modal, setModal] = React.useState(false);
  const [dataMahasiswa, setDataMahasiswa] = React.useState({});
  const [dataDosen, setDataDosen] = React.useState([]);
  const [dataAkun, setDataAkun] = React.useState({
    thead: [
      "Nama Mahasiswa",
      "NIM",
      "Username",
      "Password",
      "Angkatan",
      "Jalur Masuk",
      "Dosen Wali",
      "Status",
    ],
    tbody: [],
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [document, setDocument] = React.useState(null);

  const getDataAkun = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/akun-mahasiswa`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });

      const data = response.data.map((item) => {
        return [
          item.nama,
          item.nim,
          item.username,
          item.password,
          item.angkatan,
          item.jalurMasuk,
          item.namaDoswal,
          item.statusAktif,
        ];
      });
      setDataAkun({
        ...dataAkun,
        tbody: data,
      });
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  function showModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  const getDataDosen = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/data-dosen`;
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
      setDataDosen(data);
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const getDataMahasiswa = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/operator/data-mahasiswa`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      setDataMahasiswa(response.data);
    } catch (error) {
      if (error.response.status === 401) {
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
    const token = localStorage.getItem("accessToken");
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
      refreshData();
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      setErrorMessage(error.response.data.message);
      throw error;
    } finally {
      setIsSubmitted(false);
    }
  };

  const refreshData = () => {
    getDataAkun();
    getDataMahasiswa();
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDataDosen();
    getDataAkun();
    getDataMahasiswa();
    setIsLoading(false);
  }, []);

  const data = {
    labels: ["Sudah Memiliki Akun", "Belum Memiliki Akun"],
    colors: ["#5570F1", "#FFCC91"],
    label: "Jumlah Mahasiswa",
    elements: [
      dataMahasiswa.sudahMemilikiAkun,
      dataMahasiswa.belumMemilikiAkun,
    ],
  };
  return (
    <>
      {errorMessage && (
        <div className="flex justify-center">
          <DangerAlert message={errorMessage} />
        </div>
      )}
      <section className="flex justify-center">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Data Mahasiswa
            </h5>
          </div>
          {data && (
            <div className="max-w-xs mx-auto">
              <Charts data={data} />
            </div>
          )}
          <div className="flex justify-center items-center mt-4 gap-x-4">
            <button
              className="flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              type="button"
              onClick={showModal}
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
      </section>
      {isLoading ? <Spinner /> : <TableAkunMahasiswa dataAkun={dataAkun} />}
      {modal && (
        <EntryData
          onClick={closeModal}
          dataDosen={dataDosen}
          refreshData={refreshData}
        />
      )}
    </>
  );
}

export default Operator;
