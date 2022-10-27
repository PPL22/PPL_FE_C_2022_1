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

function TableStatusSkripsiMahasiswa({ isRekap = false, data, refreshData }) {
  if (isRekap) {
    delete data.thead[7];
    delete data.thead[8];
  }
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
      const token = localStorage.getItem("accessToken");
      await axios.put(`${config.API_URL}/dosen/validasi/skripsi`, data, {
        headers: {
          "x-access-token": token,
        },
      });
      closeModal();
      refreshData();
      toast.setToast("Validasi Skripsi Berhasil", "success");
    } catch (error) {
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
                    {item}
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
