import React from "react";
import { motion } from "framer-motion";
import {
  OutlinedButton,
  Button,
  DangerAlert,
  Input,
} from "../../components/components";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import axios from "axios";
import config from "../../configs/config.json";
import secureLocalStorage from "react-secure-storage";

import { Document, Page, pdfjs } from "react-pdf";

function Pkl({ closeModal, currentSemester, currentData }) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = React.useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const auth = useAuth();
  const toast = useToast();
  const semester = React.useRef();
  const nilaiPkl = React.useRef();
  const filePkl = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState(null);

  const formSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nim", auth.id);
    formData.append("semester", semester.current.value);
    formData.append("nilai", nilaiPkl.current.value);
    formData.append("dokumen", filePkl.current.files[0]);

    if (currentData.available) {
      formData.append("oldSemester", currentData.data["Semester"]);
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const token = secureLocalStorage.getItem("accessToken");
      await axios.post(`${config.API_URL}/mahasiswa/entry-pkl`, formData, {
        headers: {
          "x-access-token": token,
        },
      });
      closeModal(true);
      if (currentData.available) {
        toast.setToast("Data PKL berhasil diubah", "success");
      } else {
        toast.setToast("Entry Progress PKL Berhasil", "success");
      }
    } catch (error) {
      if (error.response.status === 401) {
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
        onClick={() => closeModal(false)}
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
              Entry Data Praktek Kerja Lapangan
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm"
              data-modal-toggle="entry-modal-modal"
              onClick={() => closeModal(false)}
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
                label="Nilai Pkl"
                id="nilai-pkl"
                type="number"
                innerRef={nilaiPkl}
                defaultValue={
                  currentData.available ? currentData.data["Nilai"] : ""
                }
              />
              <Input
                label="Upload Berita Seminar Pkl"
                id="file-pkl"
                type="file"
                accept="application/pdf"
                innerRef={filePkl}
                moreProps={{
                  onChange: (e) => {
                    setFile(e.target.files[0]);
                  },
                }}
                isRequired={currentData.available ? false : true}
              />
              <div className="overflow-auto max-h-80">
                <Document
                  file={
                    file
                      ? file
                      : currentData.available === true
                      ? currentData["document"]
                      : null
                  }
                  options={{ workerSrc: "/pdf.worker.js" }}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      size="A4"
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  ))}
                </Document>
              </div>
              {errorMessage && <DangerAlert message={errorMessage} />}
              <div className="flex justify-center gap-x-4">
                <OutlinedButton
                  child="Batal"
                  onClick={() => closeModal(false)}
                />
                <Button
                  type="submit"
                  child={`${currentData.available ? "Update" : "Submit"}`}
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

export default Pkl;
