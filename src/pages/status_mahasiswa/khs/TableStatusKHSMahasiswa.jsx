import React from "react";
import {
  Button,
  Dropdown,
  OutlinedButton,
  DangerAlert,
  ValidasiForm,
} from "../../../components/components";
import { useToast } from "../../../contexts/ToastContext";
import Input from "../../../components/Input";
import axios from "axios";
import config from "../../../configs/config.json";

function TableStatusKHSMahasiswa({ data, refreshData }) {
  const [document, setDocument] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const toast = useToast();
  const semester = React.useRef();
  const jumlahSks = React.useRef();
  const jumlahSksKumulatif = React.useRef();
  const ipSemester = React.useRef();
  const ipKumulatif = React.useRef();
  const status = React.useRef();
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
    const data = {
      nim: selected[2],
      semester: semester.current.value,
      jumlahSksSemester: jumlahSks.current.value,
      jumlahSksKumulatif: jumlahSksKumulatif.current.value,
      status: status.current.value,
      ips: ipSemester.current.value.toString(),
      ipk: ipKumulatif.current.value.toString(),
      fileName: document.split(config.API_DOCUMENT_URL)[1],
    };

    try {
      setLoading(true);
      setErrorMessage("");
      const token = localStorage.getItem("accessToken");
      await axios.put(`${config.API_URL}/dosen/validasi/khs`, data, {
        headers: {
          "x-access-token": token,
        },
      });
      closeModal();
      refreshData();
      toast.setToast("Validasi KHS Berhasil", "success");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-gray-500 text-center">
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
                      {item}
                    </td>
                  );
                })}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <ValidasiForm
          documentTitle={"KHS"}
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
          <Dropdown
            label="Status"
            id="status"
            innerRef={status}
            options={[
              {
                value: "Aktif",
                label: "Aktif",
              },
              {
                value: "Cuti",
                label: "Cuti",
              },
            ]}
            defaultValue={selected[9]}
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
            label="Jumlah Sks Semester"
            id="sks"
            type="number"
            innerRef={jumlahSks}
            defaultValue={selected[5]}
            moreProps={{
              min: 0,
            }}
          />
          <Input
            label="Jumlah Sks Kumulatif"
            id="sksk"
            type="number"
            innerRef={jumlahSksKumulatif}
            defaultValue={selected[6]}
          />
          <Input
            label="IP Semester"
            id="ips"
            type="number"
            innerRef={ipSemester}
            defaultValue={selected[7]}
            moreProps={{
              min: 0,
              max: 4,
              step: 0.01,
            }}
          />
          <Input
            label="IP Kumulatif"
            id="ipk"
            type="number"
            innerRef={ipKumulatif}
            defaultValue={selected[8]}
            moreProps={{
              min: 0,
              max: 4,
              step: 0.01,
            }}
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

export default TableStatusKHSMahasiswa;
