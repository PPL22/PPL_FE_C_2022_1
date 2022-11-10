import React from "react";
import { StatusPKLMahasiswa } from "../../pages";
import { Spinner } from "../../../components/components";
import config from "../../../configs/config.json";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

function RekapPKLMahasiswa() {
  const auth = useAuth();
  const [rekapPKL, setRekapPKL] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const endpoint = auth?.role.includes("Departemen")
    ? "/departemen/daftar-pkl"
    : "/dosen/daftar-pkl";

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

  const getRekapPKL = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth?.role.includes("Departemen") ? "departemen" : "dosen"
      }/rekap/pkl`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data;
      console.log(result);
      setRekapPKL(result);
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getRekapPKL();
    setIsLoading(false);
  }, []);

  return (
    <div className="overflow-x-auto relative my-10">
      <h1 className="text-center font-bold text-xl mb-8">
        Rekap Progress PKL Mahasiswa Informatika Fakultas Sains dan Matematika
        UNDIP SEMARANG
      </h1>
      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="w-full overflow-auto px-8">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 px-4 text-cente table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {rekapPKL.map((data) => {
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
                {rekapPKL.map((data, index) => {
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
                {rekapPKL.map((data, index) => {
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
      <StatusPKLMahasiswa
        isRekap={true}
        endpoint={endpoint}
        pageRekap={page}
        totalPageRekap={totalPage}
        updateLimitRekap={updateLimit}
        updatePageRekap={updatePage}
      />
    </div>
  );
}

export default RekapPKLMahasiswa;
