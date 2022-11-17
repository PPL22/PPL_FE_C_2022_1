import React from "react";
import {
  Button,
  OutlinedButton,
  DangerAlert,
  ValidasiForm,
} from "../../../components/components";
import { useToast } from "../../../contexts/ToastContext";
import Input from "../../../components/Input";
import axios from "axios";
import config from "../../../configs/config.json";
import {
  convertTimestampToYYYYMMDD,
  convertTimestampToDDMonthYYYY,
} from "../../../utils/time";
import { useAuth } from "../../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

function TableStatusSkripsiMahasiswa({
  isRekap = false,
  data,
  refreshData,
  onClickHead,
  currentFilter,
}) {
  if (isRekap) {
    delete data.thead[8];
    delete data.thead[9];
  }
  const auth = useAuth();
  const [document, setDocument] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const toast = useToast();
  const semester = React.useRef();
  const nilaiSkripsi = React.useRef();
  const tanggalLulusSidang = React.useRef();
  const lamaStudi = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleValidation = (index) => {
    setDocument(data.tbody[index].document);
    setSelected(data.tbody[index].data);
    setModal(true);
  };

  const closeModal = () => {
    setDocument("");
    setSelected([]);
    setModal(false);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    let date = tanggalLulusSidang.current.value;
    date = new Date(date.replace(/-/g, "/"));
    const data = {
      nim: selected[2],
      semester: semester.current.value,
      nilai: nilaiSkripsi.current.value,
      tanggalLulusSidang: date,
      lamaStudi: parseInt(lamaStudi.current.value),
      fileName: document.split(config.API_DOCUMENT_URL)[1],
    };

    try {
      setLoading(true);
      setErrorMessage("");
      const token = secureLocalStorage.getItem("accessToken");
      await axios.put(`${config.API_URL}/dosen/validasi/skripsi`, data, {
        headers: {
          "x-access-token": token,
        },
      });
      closeModal();
      refreshData();
      toast.setToast("Validasi Skripsi Berhasil", "success");
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      }
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-gray-500 text-center ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {data.thead.map((item, index) => {
                return (
                  <th scope="col" className="py-3 px-6" key={index}>
                    {item === "Action" || item === "No" ? (
                      item
                    ) : (
                      <button
                        className="flex justify-center items-center gap-x-2 mx-auto"
                        onClick={() => onClickHead(item)}
                      >
                        {item}
                        {currentFilter.toLowerCase() === item.toLowerCase() && (
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 5.1665H2C1.72667 5.1665 1.5 4.93984 1.5 4.6665C1.5 4.39317 1.72667 4.1665 2 4.1665H14C14.2733 4.1665 14.5 4.39317 14.5 4.6665C14.5 4.93984 14.2733 5.1665 14 5.1665Z"
                              fill="#00092E"
                            />
                            <path
                              d="M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z"
                              fill="#00092E"
                            />
                            <path
                              d="M9.33366 11.8335H6.66699C6.39366 11.8335 6.16699 11.6068 6.16699 11.3335C6.16699 11.0602 6.39366 10.8335 6.66699 10.8335H9.33366C9.60699 10.8335 9.83366 11.0602 9.83366 11.3335C9.83366 11.6068 9.60699 11.8335 9.33366 11.8335Z"
                              fill="#00092E"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.tbody.map((body, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                {body.data.map((item, index) => {
                  return (
                    <td key={index} className="py-4 px-2">
                      {index === 7 && item !== "-"
                        ? convertTimestampToDDMonthYYYY(item)
                        : item}
                    </td>
                  );
                })}
                {!isRekap && (
                  <>
                    <td className="flex justify-center items-center py-4 px-6 space-x-3">
                      <button
                        className="font-medium text-white bg-blue-500 hover:bg-blue-800 p-2 rounded"
                        onClick={() => handleValidation(index)}
                      >
                        {body.statusValidasi === false ? "Validasi" : "Edit"}
                      </button>
                    </td>
                    <td key={index} className="py-4 px-6">
                      <div
                        className={`${
                          body.statusValidasi === false
                            ? "bg-red-500"
                            : "bg-green-500"
                        } px-2 py-1 text-xs text-white rounded-xl`}
                      >
                        {body.statusValidasi === false
                          ? "Belum Validasi"
                          : "Sudah Validasi"}
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <ValidasiForm
          documentTitle={"Skripsi"}
          document={document}
          onClick={closeModal}
          onSubmit={(e) => formSubmit(e)}
        >
          <Input
            label="Nama Mahasiswa"
            id="nama_mahasiswa"
            type="text"
            defaultValue={selected[1]}
            disabled={true}
          />
          <Input
            label="NIM Mahasiswa"
            id="nim_mahasiswa"
            type="text"
            defaultValue={selected[2]}
            disabled={true}
          />
          <Input
            label="Semester"
            id="semester"
            type="number"
            innerRef={semester}
            defaultValue={selected[4]}
            moreProps={{
              min: 1,
              max: 14,
            }}
          />
          <Input
            label="Nilai Skripsi"
            id="nilai-skripsi"
            type="number"
            innerRef={nilaiSkripsi}
            defaultValue={selected[5]}
          />
          <Input
            label="Tanggal Lulus Sidang"
            id="tanggal-sidang"
            type="date"
            innerRef={tanggalLulusSidang}
            defaultValue={convertTimestampToYYYYMMDD(selected[7])}
          />
          <Input
            label="Lama Studi Semester"
            id="lama-studi-semester"
            type="number"
            innerRef={lamaStudi}
            defaultValue={selected[6]}
          />
          {errorMessage && <DangerAlert message={errorMessage} />}
          <div className="flex justify-center gap-x-4">
            <OutlinedButton child="Cancel" onClick={closeModal} />
            <Button
              type="submit"
              child="Validasi"
              loadingState="Loading..."
              loading={loading}
            />
          </div>
        </ValidasiForm>
      )}
    </>
  );
}

export default TableStatusSkripsiMahasiswa;
