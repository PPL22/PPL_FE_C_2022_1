import React from "react";
import Charts from "../components/Charts";
import config from "../configs/config.json";
import axios from "axios";
import Spinner from "../components/Spinner";

function Departemen() {
  const [dataIRS, setDataIRS] = React.useState({
    labels: ["Sudah Verifikasi", "Belum Validasi", "Belum Entry"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status IRS Mahasiswa",
    elements: [0, 0, 0],
  });
  const [dataKHS, setDataKHS] = React.useState({
    labels: ["Sudah Verifikasi", "Belum Validasi", "Belum Entry"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status KHS Mahasiswa",
    elements: [0, 0, 0],
  });
  const [dataPKL, setDataPKL] = React.useState({
    labels: ["Lulus", "Belum Validasi", "Belum Lulus"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status PKL Mahasiswa",
    elements: [0, 0, 0],
  });
  const [dataSkripsi, setDataSkripsi] = React.useState({
    labels: ["Lulus", "Belum Validasi", "Belum Lulus"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status Skripsi Mahasiswa",
    elements: [0, 0, 0],
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const getDashboard = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/departemen/dashboard`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data;
      setDataIRS({
        ...dataIRS,
        elements: [
          result.irs.validated,
          result.irs.notValidated,
          result.irs.noEntry,
        ],
      });
      setDataKHS({
        ...dataKHS,
        elements: [
          result.khs.validated,
          result.khs.notValidated,
          result.khs.noEntry,
        ],
      });
      setDataPKL({
        ...dataPKL,
        elements: [
          result.pkl.lulus,
          result.pkl.notValidated,
          result.pkl.blmLulus,
        ],
      });
      setDataSkripsi({
        ...dataSkripsi,
        elements: [
          result.skripsi.lulus,
          result.skripsi.notValidated,
          result.skripsi.blmLulus,
        ],
      });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDashboard();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="flex flex-wrap justify-evenly my-10 gap-10 items-center lg:px-20">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md text-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          Status IRS Mahasiswa
        </h5>
        <Charts data={dataIRS} />
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md text-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          Status PKL Mahasiswa
        </h5>
        <Charts data={dataPKL} />
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md text-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          Status KHS Mahasiswa
        </h5>
        <Charts data={dataKHS} />
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md text-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          Status Skripsi Mahasiswa
        </h5>
        <Charts data={dataSkripsi} />
      </div>
    </section>
  );
}

export default Departemen;
