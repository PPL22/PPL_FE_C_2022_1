import React from "react";
import { Button } from "flowbite-react";
import {
  Keterangan,
  BtnSemester,
  DropdownSearch,
  ModalStatus,
} from "../components/components";
import axios from "axios";
import config from "../configs/config.json";
import { useAuth } from "../contexts/AuthContext";
import { convertDataAkademik } from "../utils/convertDataAkademik";
import { convertTimestampToDDMonthYYYY } from "../utils/time";
import profile from "../assets/images/default_profile.png";
import secureLocalStorage from "react-secure-storage";

export default function DataMhs() {
  const auth = useAuth();
  const [dataMahasiswa, setDataMahasiswa] = React.useState([]);
  const [mahasiswa, setMahasiswa] = React.useState(null);
  const [dataSemester, setDataSemester] = React.useState([]);
  const [progress, setProgress] = React.useState(null);
  const [showStatus, setShowStatus] = React.useState(false);

  const handleChange = (keyword) => {
    if (keyword.length > 0) {
      getDataMahasiswaByKeyword(keyword);
    } else {
      setDataMahasiswa([]);
    }
  };

  const handleSemester = (semester) => {
    setProgress(semester);
  };

  const getDataMahasiswaByKeyword = async (keyword) => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth.currentRole === "Departemen" ? "departemen" : "dosen"
      }/search-mhs?keyword=${keyword}`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data;
      const data = result.map((item) => {
        const foto = item.foto
          ? config.API_IMAGE_URL + "/foto_mhs/" + item.foto
          : profile;
        return {
          value: item.nim,
          label: item.nama,
          foto: foto,
        };
      });
      setDataMahasiswa(data);
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const getDataMahasiswaByNim = async (nim) => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth.currentRole === "Departemen" ? "departemen" : "dosen"
      }/data-akademik-mhs?nim=${nim}`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data;
      const dataAkademik = Object.keys(result.dataAkademik).map((key) => {
        return {
          semester: key,
          data: result.dataAkademik[key],
        };
      });

      let semester = [];
      for (let i = 0; i < 14; i++) {
        if (i < dataAkademik.length) {
          const data = dataAkademik[i].data;
          semester.push({
            semester: dataAkademik[i].semester,
            type: convertDataAkademik(data),
            data: dataAkademik[i].data,
          });
        } else {
          semester.push({
            semester: `Semester ${i + 1}`,
            type: "",
            data: null,
          });
        }
      }
      setDataSemester(semester);
      setMahasiswa(result);
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  const closeModal = (isRefresh) => {
    setShowStatus(false);
    if (isRefresh) {
      getDataMahasiswaByNim(mahasiswa.nim);
    }
  };

  return (
    <div className="mt-4 flex justify-center flex-col px-4">
      <DropdownSearch
        id="data-mahasiswa"
        placeholder="Cari Nama atau NIM Mahasiswa"
        onChange={(inputValue) => handleChange(inputValue)}
        options={dataMahasiswa}
        onSelect={(data) => {
          getDataMahasiswaByNim(data.value);
        }}
        formatOptionLabel={(data) => (
          <div className="flex items-center">
            <img
              src={data.foto}
              alt="foto"
              className="w-10 h-10 rounded-full mr-2 object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{data.label}</span>
              <span className="text-xs text-gray-500">{data.value}</span>
            </div>
          </div>
        )}
      />
      {mahasiswa && (
        <>
          <h1 className="text-2xl font-bold mt-4 text-center">
            Data Mahasiswa
          </h1>
          <section className="flex justify-center">
            <div className="grid grid-cols-6 mt-6 gap-x-8">
              <div className="col-span-2 flex m-auto">
                <img
                  src={`${
                    mahasiswa.foto === null
                      ? profile
                      : config.API_IMAGE_URL + "/foto_mhs/" + mahasiswa.foto
                  }`}
                  alt="foto profil"
                  className="rounded-full w-60 h-60 object-cover"
                />
              </div>
              <div className="col-span-4">
                <p className="text-lg mt-2">
                  <strong>Nama :</strong> {mahasiswa.nama}
                </p>
                <p className="text-lg mt-2">
                  <strong>Nim :</strong> {mahasiswa.nim}
                </p>
                <p className="text-lg mt-2">
                  <strong>Email :</strong> {mahasiswa.email}
                </p>
                <p className="text-lg mt-2">
                  <strong>Angkatan :</strong> {mahasiswa.angkatan}
                </p>
                <p className="text-lg mt-2">
                  <strong>Dosen Wali :</strong> {mahasiswa.namaDoswal}
                </p>
                <p className="text-lg mt-2">
                  <strong>Alamat :</strong> {mahasiswa.alamat}
                </p>
                <p className="text-lg mt-2 flex items-center gap-x-2">
                  <strong>No HP :</strong> {mahasiswa.noHP}{" "}
                  {mahasiswa.noHP && (
                    <a
                      href={`https://api.whatsapp.com/send?phone=${
                        mahasiswa.noHP[0] === "+"
                          ? mahasiswa.noHP.substring(1)
                          : mahasiswa.noHP
                      }`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs p-1 bg-green-500 rounded font-semibold text-white"
                    >
                      Hubungi
                    </a>
                  )}
                  {showStatus && (
                    <ModalStatus closeModal={closeModal} data={mahasiswa} />
                  )}
                </p>
                <p className="text-lg mt-2 flex items-center gap-x-2">
                  <strong>Status Aktif :</strong> {mahasiswa.statusAktif}{" "}
                  {auth.currentRole === "Dosen" && (
                    <button
                      onClick={() => setShowStatus(true)}
                      className="text-xs p-1 bg-orange-500 rounded font-semibold text-white"
                    >
                      Ubah Status
                    </button>
                  )}
                  {showStatus && (
                    <ModalStatus closeModal={closeModal} data={mahasiswa} />
                  )}
                </p>
              </div>
            </div>
          </section>
          <h1 className="text-2xl font-bold mt-6 text-center">Semester</h1>
          <section className="mx-12 mt-4 grid grid-cols-7 gap-3">
            {dataSemester.map((item, index) => {
              return (
                <div className="col-span-1" key={index}>
                  <BtnSemester
                    status={item.type}
                    child={index + 1}
                    onClick={() => handleSemester(dataSemester[index])}
                  />
                </div>
              );
            })}
          </section>
          <small className="mx-10 text-mg font-bold mt-4 text-start">
            Keterangan
          </small>
          <div className="mx-10 flex gap-x-4">
            <div>
              <Keterangan
                color={"bg-blue-500"}
                child={"Sudah diisikan atau digunakan"}
              />
              <Keterangan
                color={"bg-yellow-300"}
                child={"Sudah diisikan PKL (IRS, KHS, PKL)"}
              />
            </div>
            <div>
              <Keterangan
                color={"bg-red-500"}
                child={"Belum diisikan atau digunakan"}
              />
              <Keterangan
                color={"bg-green-500"}
                child={"Sudah diisikan skripsi"}
              />
            </div>
          </div>

          {progress && (
            <h2 className="text-2xl font-bold mt-4 text-center">
              Progress Semester {progress.semester}
            </h2>
          )}
          <section className="py-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-3">
            {progress &&
              progress.data.map((item, index) => {
                return item.type === "irs" && item.available ? (
                  <div
                    className="bg-[#FEF5EA] flex rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col"
                    key={index}
                  >
                    <div className="flex h-full flex-col justify-center gap-4 p-6">
                      <div className="h-full grid grid-cols-1 content-between">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                          IRS
                        </h5>
                        <p className="py-4 font-semibold text-2xl tracking-tight text-gray-900 text-center">
                          {item.jumlahSks} SKS
                        </p>
                        <a
                          href={`${config.API_DOCUMENT_URL}/irs/${item.fileIrs}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button>Lihat Dokumen</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : item.type === "khs" && item.available ? (
                  <div
                    className="bg-[#FEF5EA] flex rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col"
                    key={index}
                  >
                    <div className="flex h-full flex-col justify-center gap-4 p-6">
                      <div className="h-full grid grid-cols-1 content-between">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                          KHS
                        </h5>
                        <div className="text-base py-4 flex justify-center gap-x-1 text-mg tracking-tight text-gray-900">
                          <div className="font-semibold">
                            <div>SKS Semester</div>
                            <div>IP Semester</div>
                            <div>SKS Kumulatif</div>
                            <div>IP Kumulatif</div>
                          </div>
                          <div className="font-semibold">
                            <div>:</div>
                            <div>:</div>
                            <div>:</div>
                            <div>:</div>
                          </div>
                          <div>
                            <div>{item.jumlahSksSemester}</div>
                            <div>{item.ips}</div>
                            <div>{item.jumlahSksKumulatif}</div>
                            <div>{item.ipk}</div>
                          </div>
                        </div>
                        <a
                          href={`${config.API_DOCUMENT_URL}/khs/${item.fileKhs}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button>Lihat Dokumen</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : item.type === "pkl" && item.available ? (
                  <div
                    className="bg-[#FEF5EA] flex rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col"
                    key={index}
                  >
                    <div className="flex h-full flex-col justify-center gap-4 p-6">
                      <div className="h-full grid grid-cols-1 content-between">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                          PKL
                        </h5>
                        <div className="grid grid-cols-2 space-x-4 py-4 text-2xl tracking-tight text-gray-900 text-center">
                          <div className="col-span-1">
                            <div className="font-bold">Nilai</div>
                            <div className="mt-2">{item.nilai}</div>
                          </div>
                          <div className="col-span-1">
                            <div className="font-bold">Semester</div>
                            <div className="mt-2">{item.semester}</div>
                          </div>
                        </div>
                        <a
                          href={`${config.API_DOCUMENT_URL}/pkl/${item.filePkl}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button>Lihat Dokumen</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : item.type === "skripsi" && item.available ? (
                  <div
                    className="bg-[#FEF5EA] flex rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col"
                    key={index}
                  >
                    <div className="flex h-full flex-col justify-center gap-4 p-6">
                      <div className="h-full grid grid-cols-1 content-between">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                          Skripsi
                        </h5>
                        <div className="text-sm py-4 flex gap-x-1 text-mg tracking-tight text-gray-900">
                          <div className="font-semibold">
                            <div>Nilai</div>
                            <div>Semester</div>
                            <div>Lama Studi</div>
                            <div>Tanggal sidang</div>
                          </div>
                          <div className="font-semibold">
                            <div>:</div>
                            <div>:</div>
                            <div>:</div>
                            <div>:</div>
                          </div>
                          <div>
                            <div>{item.nilai}</div>
                            <div>{item.semester}</div>
                            <div>{item.lamaStudi}</div>
                            <div>
                              {convertTimestampToDDMonthYYYY(
                                item.tanggalLulusSidang
                              )}
                            </div>
                          </div>
                        </div>
                        <a
                          href={`${config.API_DOCUMENT_URL}/skripsi/${item.fileSkripsi}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button>Lihat Dokumen</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
          </section>
        </>
      )}
    </div>
  );
}
