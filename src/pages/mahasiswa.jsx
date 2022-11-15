import React from "react";
import {
  CardInfo,
  EntryDataMhs,
  IndicatorButton,
  ProgressBarSemester,
} from "../components/components";
import config from "../configs/config.json";
import axios from "axios";
import Spinner from "../components/Spinner";
import { statusAktifColor } from "../utils/statusAktifColor";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import { convertTimestampToDDMonthYYYY } from "../utils/time";
import profile from "../assets/images/default_profile.png";
import { useAuth } from "../contexts/AuthContext";

function Mahasiswa() {
  const auth = useAuth();
  const [modal, setModal] = React.useState(false);
  const [entryState, setEntryState] = React.useState("none");
  const [data, setData] = React.useState(null);
  const [dataSemester, setDataSemester] = React.useState([]);
  const [currentSemester, setCurrentSemester] = React.useState(0);
  const [currentData, setCurrentData] = React.useState(null);
  const [statusDocument, setStatusDocument] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [documentName, setDocumentName] = React.useState("IRS");
  const [showMore, setShowMore] = React.useState(false);

  const showModal = (entry) => {
    setModal(true);
    setEntryState(entry);
  };

  const handleDocumentName = (name) => {
    setDocumentName(name);
  };

  const handleSemester = (semester) => {
    setCurrentSemester(semester);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleStatusDocument = () => {
    let document = data.dataAkademik[currentSemester];
    document = document.map((item) => {
      const type = item.type.length <= 3 ? item.type.toUpperCase() : item.type;
      return {
        type,
        isAvailable: item.available,
      };
    });
    if (document.length < 4 && currentSemester > 5) {
      if (document.find((item) => item.type === "PKL")) {
        document.push({
          type: "Skripsi",
          isAvailable: false,
        });
      } else if (document.find((item) => item.type === "skripsi")) {
        document.push({
          type: "PKL",
          isAvailable: false,
        });
      } else {
        document.push({
          type: "PKL",
          isAvailable: false,
        });
        if (currentSemester > 6) {
          document.push({
            type: "Skripsi",
            isAvailable: false,
          });
        }
      }
    }

    // sort by type
    document.sort((a, b) => {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0;
    });

    setStatusDocument(document);
  };

  const refreshCurrentData = () => {
    let dataAkademik = data.dataAkademik[currentSemester];
    console.log("DIPANGGIL");
    dataAkademik = dataAkademik.filter(
      (item) => item.type === documentName.toLowerCase()
    )[0];
    const result = {
      available: false,
      data: {},
      type: "",
    };

    if (dataAkademik) {
      Object.keys(dataAkademik).map((item) => {
        if (item === "available") {
          return (result.available = dataAkademik[item]);
        } else if (item.includes("file")) {
          return (result.document =
            config.API_DOCUMENT_URL +
            `/${documentName.toLowerCase()}/` +
            dataAkademik[item]);
        } else if (item !== "statusValidasi" && item !== "type") {
          let key = item.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
          key = key.charAt(0).toUpperCase() + key.slice(1);

          if (key.split(" ")[0].length === 3) {
            key = key.split(" ")[0].toUpperCase();
            if (key.split(" ").length > 1) {
              key += " " + key.split(" ")[1];
            }
          }
          return (result.data[key] = dataAkademik[item]);
        }
        return null;
      });
    } else {
      result.data.Semester = currentSemester;
    }
    setCurrentData(result);
  };

  const getDashboard = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/mahasiswa/dashboard`;
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = response.data;
      const semester = Object.keys(result.dataAkademik).map((key) => {
        const irs = result.dataAkademik[key].filter((e) => e.type === "irs")[0];
        if (irs.available === true) {
          return parseInt(irs.jumlahSks);
        } else {
          return 0;
        }
      });

      setDataSemester(semester);
      setData(result);
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  React.useEffect(() => {
    if (data && currentSemester !== 0) {
      handleStatusDocument();
    }
  }, [currentSemester, data]);

  React.useEffect(() => {
    if (data) {
      refreshCurrentData();
    }
  }, [statusDocument, documentName]);

  React.useEffect(() => {
    setIsLoading(true);
    getDashboard();
    setIsLoading(false);
  }, []);

  return isLoading || !data ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <section className="grid grid-cols-12 mt-10 justify-center gap-x-10 px-10">
        <div className="col-span-5">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-center">
              <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Prestasi Akademik
              </h1>
            </div>
            <div className="flex justify-evenly">
              <div className="w-40 bg-gradient-to-tr w-30 py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-[#D9D9D9]">
                  IPK
                </h1>
                <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-[#D9D9D9]">
                  {data.ipkNow}
                </h1>
              </div>
              <div className="w-40 bg-gradient-to-tr py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-[#D9D9D9]">
                  SKSks
                </h1>
                <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-[#D9D9D9]">
                  {data.sksNow}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-7">
          <div className="p-6  bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-center mb-4">
              <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Status Akademik
              </h1>
            </div>
            <div className="flex justify-center gap-x-4 mb-4">
              <img
                src={data.fotoDoswal === null ? profile : data.fotoDoswal}
                alt="foto profil"
                className="rounded-full w-24 h-24 object-cover"
              />
              <div>
                <h2 className="text-lg font-bold mt-2">
                  Dosen Wali : {data.namaDoswal}
                </h2>
                <h2 className="mt-1">NIP : {data.nipDoswal}</h2>
              </div>
            </div>
            <div className="flex justify-evenly">
              <div className="w-40 bg-gradient-to-tr w-30 py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-[#D9D9D9]">
                  Semester
                </h1>
                <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-[#D9D9D9]">
                  {data.semester}
                </h1>
              </div>
              <div className="w-40 bg-gradient-to-tr py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-[#D9D9D9]">
                  Status
                </h1>
                <div
                  className={`${statusAktifColor(
                    data.statusAktif
                  )} text-center py-2 text-lg`}
                >
                  {data.statusAktif}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex px-4 justify-center mt-10">
        <div className="h-full p-6 w-full rounded-lg border border-gray-200 shadow-md bg-[#FEF5EA]">
          <div className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Progress Perkuliahan
          </div>
          <div className="grid grid-cols-12 gap-x-4 mb-4">
            <div className="col-span-4 flex flex-col gap-y-4">
              {dataSemester.map(
                (item, index) =>
                  index < 8 && (
                    <ProgressBarSemester
                      onClick={() => handleSemester(index + 1)}
                      key={index}
                      jumlahSks={item}
                      semester={index + 1}
                      isActive={index + 1 === currentSemester}
                    />
                  )
              )}
              {showMore && (
                <motion.div
                  className="col-span-4 flex flex-col gap-y-4"
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      duration: 0.75,
                    },
                  }}
                >
                  {dataSemester.map(
                    (item, index) =>
                      index >= 8 && (
                        <ProgressBarSemester
                          onClick={() => handleSemester(index + 1)}
                          key={index}
                          jumlahSks={item}
                          semester={index + 1}
                          isActive={index + 1 === currentSemester}
                        />
                      )
                  )}
                </motion.div>
              )}
              {dataSemester.length >= 8 && (
                <Button onClick={handleShowMore}>Lihat Lebih Banyak</Button>
              )}
            </div>
            <div className="col-span-8 mb-auto">
              {statusDocument.length > 0 && (
                <div className="h-full px-4 py-2 w-full rounded-lg border border-gray-200 shadow-md bg-white">
                  <div className="flex gap-x-4 mb-4">
                    {statusDocument.map((item, index) => {
                      return (
                        <IndicatorButton
                          key={index}
                          name={item.type}
                          isActive={documentName === item.type}
                          isAvailable={item.isAvailable}
                          onClick={() => handleDocumentName(item.type)}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-evenly flex-wrap gap-4">
                    {currentData &&
                      Object.keys(currentData.data).map((item, index) => {
                        if (item.toLowerCase() === "tanggal lulus sidang") {
                          return (
                            <CardInfo
                              key={index}
                              title={item}
                              data={convertTimestampToDDMonthYYYY(
                                currentData.data[item]
                              )}
                            />
                          );
                        }
                        return (
                          <CardInfo
                            key={index}
                            title={item}
                            data={currentData.data[item]}
                          />
                        );
                      })}
                  </div>
                  {currentData && !currentData.available ? (
                    <button
                      type="button"
                      onClick={() => showModal(documentName.toLowerCase())}
                      className="flex mt-4 w-full bg-gradient-to-br py-2 from-blue-400 to-cyan-400 rounded-lg justify-center items-center text-xl font-bold tracking-tight text-gray-700"
                    >
                      Entry Document
                    </button>
                  ) : currentData && currentData.available ? (
                    <a
                      href={currentData.document}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button
                        type="button"
                        className="flex mt-4 w-full bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded-lg justify-center items-center text-xl font-bold tracking-tight text-gray-700"
                      >
                        Lihat Dokumen
                      </button>
                    </a>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {modal && (
        <EntryDataMhs
          setModal={setModal}
          modal={modal}
          refreshData={() => getDashboard()}
          currentSemester={currentSemester}
          setEntryState={setEntryState}
          entryState={entryState}
        />
      )}
    </>
  );
}

export default Mahasiswa;
