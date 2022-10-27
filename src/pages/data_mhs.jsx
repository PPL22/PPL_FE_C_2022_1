import React from "react";
import { Card, Button } from "flowbite-react";
import {
  Keterangan,
  BtnSemester,
  DropdownSearch,
} from "../components/components";
import axios from "axios";
import config from "../configs/config.json";
import { useAuth } from "../contexts/AuthContext";
import { convertDataAkademik } from "../utils/convertDataAkademik";
import { convertTimestampToDDMonthYYYY } from "../utils/time";
import profile from "../assets/images/default_profile.png";

export default function DataMhs() {
  const auth = useAuth();
  const [dataMahasiswa, setDataMahasiswa] = React.useState([]);
  const [mahasiswa, setMahasiswa] = React.useState(null);
  const [dataSemester, setDataSemester] = React.useState([]);
  const [progress, setProgress] = React.useState(null);

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
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth?.role.includes("Departemen") ? "departemen" : "dosen"
      }/search-mhs?keyword=${keyword}`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data.data;
      const data = result.map((item) => {
        return {
          value: item.nim,
          label: `${item.nim} - ${item.nama}`,
        };
      });
      setDataMahasiswa(data);
    } catch (error) {
      throw error;
    }
  };

  const getDataMahasiswaByNim = async (nim) => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${
        auth?.role.includes("Departemen") ? "departemen" : "dosen"
      }/data-akademik-mhs/${nim}`;
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
      throw error;
    }
  };

  return (
    <div className="mt-4 flex justify-center flex-col px-4">
      <DropdownSearch
        id="data-mahasiswa"
        placeholder="Cari Nama atau NIM Mahasiswa"
        onChange={(inputValue) => {
          setTimeout(() => {
            handleChange(inputValue);
          }, 500);
        }}
        options={dataMahasiswa}
        onSelect={(data) => {
          getDataMahasiswaByNim(data.value);
        }}
      />
      {mahasiswa && (
        <>
          <h1 className="text-2xl font-bold mt-4 text-center">
            Data Mahasiswa
          </h1>
          <section className="flex justify-center">
            <div className="grid grid-cols-6 mt-6 ">
              <div className="col-span-2 flex m-auto">
                <img
                  src={`${
                    mahasiswa.foto === null
                      ? profile
                      : config.API_IMAGE_URL + "/foto_mhs/" + mahasiswa.foto
                  }`}
                  alt="foto profil"
                  className="rounded-full w-20 h-20 object-cover"
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
                  <strong>Angkatan :</strong> {mahasiswa.angkatan}
                </p>
                <p className="text-lg mt-2">
                  <strong>Dosen Wali :</strong> {mahasiswa.namaDoswal}
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
                  <Card key={index}>
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
                  </Card>
                ) : item.type === "khs" && item.available ? (
                  <Card key={index}>
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
                  </Card>
                ) : item.type === "pkl" && item.available ? (
                  <Card key={index}>
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
                  </Card>
                ) : item.type === "skripsi" && item.available ? (
                  <Card key={index}>
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
                  </Card>
                ) : null;
              })}
          </section>
        </>
      )}
    </div>
  );
}
