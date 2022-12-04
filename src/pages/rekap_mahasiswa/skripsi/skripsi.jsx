import React from "react";
import { StatusSkripsiMahasiswa } from "../../pages";
import { Spinner } from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

function RekapSkripsiMahasiswa() {
  const auth = useAuth();
  const [rekapSkripsi, setRekapSkripsi] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const endpoint =
    auth.currentRole === "Departemen"
      ? "/departemen/daftar-skripsi"
      : "/dosen/daftar-skripsi";

  const getRekapSkripsi = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth.currentRole === "Departemen" ? "departemen" : "dosen"
      }/rekap/skripsi`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data;
      setRekapSkripsi(result);
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getRekapSkripsi();
    setIsLoading(false);
  }, []);

  return (
    <div className="overflow-x-auto relative my-10">
      <h1 className="text-center font-bold text-xl mb-8">
        Rekap Progress Skripsi Mahasiswa Informatika Fakultas Sains dan
        Matematika UNDIP SEMARANG
      </h1>
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full overflow-auto px-8">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 px-4 text-center table-auto">
            <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {rekapSkripsi.map((data) => {
                  return (
                    <th
                      key={data.angkatan}
                      scope="col"
                      colSpan={2}
                      className="py-3 px-6"
                    >
                      {data.angkatan}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {rekapSkripsi.map((data, index) => {
                  return (
                    <>
                      <th scope="col" className="py-3 px-6">
                        Sudah
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Belum
                      </th>
                    </>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {rekapSkripsi.map((data, index) => {
                  return (
                    <>
                      <th scope="col" className="py-3 px-6">
                        {data.lulus}
                      </th>
                      <th scope="col" className="py-3 px-6">
                        {data.belum}
                      </th>
                    </>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <StatusSkripsiMahasiswa isRekap={true} endpoint={endpoint} />
    </div>
  );
}

export default RekapSkripsiMahasiswa;
