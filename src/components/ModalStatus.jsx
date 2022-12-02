import React from "react";
import { motion } from "framer-motion";
import {
  Input,
  OutlinedButton,
  Button,
  Dropdown,
  DangerAlert,
} from "./components";
import { useAuth } from "../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";
import { useToast } from "../contexts/ToastContext";

import axios from "axios";
import config from "../configs/config.json";

function ModalStatus({ closeModal, data }) {
  const auth = useAuth();
  const toast = useToast();
  const nama = React.useRef();
  const nim = React.useRef();
  const status = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage("");
      const token = secureLocalStorage.getItem("accessToken");
      await axios.put(
        `${config.API_URL}/dosen/status-aktif-mhs`,
        {
          nim: nim.current.value,
          statusAktif: status.current.value,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      closeModal(true);
      toast.setToast("Status aktif mahasiswa berhasil diubah", "success");
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
              Entry Data Isian Rencana Studi
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
                label="nim"
                id="nim"
                type="text"
                innerRef={nim}
                defaultValue={data.nim}
                disabled={true}
              />
              <Input
                label="nama"
                id="nama"
                type="text"
                innerRef={nama}
                defaultValue={data.nama}
                disabled={true}
              />
              <Dropdown
                label="Status"
                id="status"
                innerRef={status}
                defaultValue={data.statusAktif}
                options={[
                  {
                    value: "Aktif",
                    label: "Aktif",
                  },
                  {
                    value: "Cuti",
                    label: "Cuti",
                  },
                  {
                    value: "Mangkir",
                    label: "Mangkir",
                  },
                  {
                    value: "DO",
                    label: "DO",
                  },
                  {
                    value: "Lulus",
                    label: "Lulus",
                  },
                  {
                    value: "UndurDiri",
                    label: "Undur Diri",
                  },
                  {
                    value: "MeninggalDunia",
                    label: "Meninggal Dunia",
                  },
                ]}
              />
              {errorMessage && <DangerAlert message={errorMessage} />}
              <div className="flex justify-center gap-x-4">
                <OutlinedButton
                  child="Batal"
                  onClick={() => closeModal(false)}
                />
                <Button
                  type="submit"
                  child={"Update"}
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

export default ModalStatus;
