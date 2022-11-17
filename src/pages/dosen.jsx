import React from "react";
import config from "../configs/config.json";
import axios from "axios";
import { DashboardCard, Spinner } from "../components/components";
import { useAuth } from "../contexts/AuthContext";

function Dosen() {
  const auth = useAuth();
  const [dataIRS, setDataIRS] = React.useState({
    labels: ["Sudah Verifikasi", "Belum Validasi", "Belum Entry"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status IRS Mahasiswa",
    elements: [0, 0, 0],
    angkatan: "Semua Angkatan",
  });
  const [dataKHS, setDataKHS] = React.useState({
    labels: ["Sudah Verifikasi", "Belum Validasi", "Belum Entry"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status KHS Mahasiswa",
    elements: [0, 0, 0],
    angkatan: "Semua Angkatan",
  });
  const [dataPKL, setDataPKL] = React.useState({
    labels: ["Lulus", "Belum Validasi", "Belum Lulus"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status PKL Mahasiswa",
    elements: [0, 0, 0],
    angkatan: "Semua Angkatan",
  });
  const [dataSkripsi, setDataSkripsi] = React.useState({
    labels: ["Lulus", "Belum Validasi", "Belum Lulus"],
    colors: ["#5570F1", "#FFCC91", "#CC5F5F"],
    label: "Status Skripsi Mahasiswa",
    elements: [0, 0, 0],
    angkatan: "Semua Angkatan",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const getDashboard = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/dosen/dashboard`;
      const response = await axios.get(url, {
        params: {
          dokumen: "ALL",
        },
        headers: {
          "x-access-token": token,
        },
      });
      console.log(response);
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
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const filterDashboard = async (angkatan, document) => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/dosen/dashboard`;
      const response = await axios.get(url, {
        params: {
          angkatan: angkatan === "Semua Angkatan" ? null : angkatan,
          dokumen: document,
        },
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data;
      console.log(result);
      if (document === "IRS") {
        setDataIRS({
          ...dataIRS,
          elements: [
            result.irs.validated,
            result.irs.notValidated,
            result.irs.noEntry,
          ],
        });
      } else if (document === "KHS") {
        setDataKHS({
          ...dataKHS,
          elements: [
            result.khs.validated,
            result.khs.notValidated,
            result.khs.noEntry,
          ],
        });
      } else if (document === "PKL") {
        setDataPKL({
          ...dataPKL,
          elements: [
            result.pkl.lulus,
            result.pkl.notValidated,
            result.pkl.blmLulus,
          ],
        });
      } else if (document === "SKRIPSI") {
        setDataSkripsi({
          ...dataSkripsi,
          elements: [
            result.skripsi.lulus,
            result.skripsi.notValidated,
            result.skripsi.blmLulus,
          ],
        });
      }
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const updateData = (angkatan, document) => {
    filterDashboard(angkatan, document);
  };

  React.useEffect(() => {
    setIsLoading(true);
    getDashboard();
    setIsLoading(false);
  }, []);

  React.useEffect(() => {}, [dataIRS, dataKHS, dataPKL, dataSkripsi]);

  return isLoading ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="flex flex-wrap justify-evenly my-10 gap-10 lg:px-20">
      <DashboardCard
        data={dataIRS}
        updateData={updateData}
        title="Status IRS Mahasiswa"
        path={"/dashboard/status/irs"}
      />
      <DashboardCard
        data={dataPKL}
        updateData={updateData}
        title="Status PKL Mahasiswa"
        path={"/dashboard/status/pkl"}
      />

      <DashboardCard
        data={dataKHS}
        updateData={updateData}
        title="Status KHS Mahasiswa"
        path={"/dashboard/status/khs"}
      />
      <DashboardCard
        data={dataSkripsi}
        updateData={updateData}
        title="Status Skripsi Mahasiswa"
        path={"/dashboard/status/skripsi"}
      />
    </section>
  );
}

export default Dosen;
