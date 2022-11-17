import React from "react";
import { motion } from "framer-motion";
import Input from "./Input";
import { OutlinedButton, Button, DangerAlert } from "./components";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import config from "../configs/config.json";

function Skripsi({ closeModal, currentSemester }) {
  const auth = useAuth();
  const toast = useToast();
  const semester = React.useRef();
  const nilaiSkripsi = React.useRef();
  const fileSkripsi = React.useRef();
  const tanggalLulusSidang = React.useRef();
  const lamaStudi = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nim", auth.id);
    formData.append("semester", semester.current.value);
    formData.append("nilai", nilaiSkripsi.current.value);
    formData.append("tanggalLulusSidang", tanggalLulusSidang.current.value);
    formData.append("lamaStudi", lamaStudi.current.value);
    formData.append("dokumen", fileSkripsi.current.files[0]);

    try {
      setLoading(true);
      setErrorMessage("");
      const token = secureLocalStorage.getItem("accessToken");
      await axios.post(`${config.API_URL}/mahasiswa/entry-skripsi`, formData, {
        headers: {
          "x-access-token": token,
        },
      });
      closeModal();
      toast.setToast("Entry Progress Skripsi Berhasil", "success");
    } catch (error) {
      if (error.status === 401) {
        auth.logout();
      } else {
        setErrorMessage(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      id="entry-data-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-full flex justify-center"
    >
      <div
        onClick={closeModal}
        className="fixed left-0 top-0 bottom-0 right-0 bg-black/20"
      ></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative p-4 w-full max-w-md h-full md:h-auto z-10"
      >
        <div className="relative bg-background rounded-lg shadow">
          <div className="flex justify-between items-center pt-6 px-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Entry Data Skripsi
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm"
              data-modal-toggle="entry-modal-modal"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="pt-3 pb-6 px-4">
            <form className="space-y-6" onSubmit={(e) => formSubmit(e)}>
              <Input
                label="Semester"
                id="semester"
                type="number"
                innerRef={semester}
                defaultValue={currentSemester}
                disabled={true}
              />
              <Input
                label="Nilai Skripsi"
                id="nilai-skripsi"
                type="number"
                innerRef={nilaiSkripsi}
                moreProps={{
                  min: 0,
                  max: 100,
                }}
              />
              <Input
                label="Tanggal Lulus Sidang"
                id="tanggal-sidang"
                type="date"
                innerRef={tanggalLulusSidang}
              />
              <Input
                label="Lama Studi Semester"
                id="lama-studi-semester"
                type="number"
                innerRef={lamaStudi}
                moreProps={{
                  min: 7,
                  max: 14,
                }}
              />
              <Input
                label="Upload Seminar Sidang Skripsi"
                id="file-skripsi"
                type="file"
                accept="application/pdf"
                innerRef={fileSkripsi}
              />
              {errorMessage && <DangerAlert message={errorMessage} />}
              <div className="flex justify-center gap-x-4">
                <OutlinedButton child="Cancel" onClick={closeModal} />
                <Button
                  type="submit"
                  child="Submit"
                  loadingState="Loading..."
                  loading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Skripsi;
