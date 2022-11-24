import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import config from "../../configs/config.json";
import {
  Input,
  OutlinedButton,
  Button,
  InputGenerate,
  DangerAlert,
} from "../../components/components";
import { useToast } from "../../contexts/ToastContext";
import { useAuth } from "../../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

function EntryDataDosen({ onClick, refreshData }) {
  const toast = useToast();
  const auth = useAuth();
  const generateCharacter = () => {
    return Math.random().toString(36).substring(2);
  };
  const [username, setUsername] = React.useState(generateCharacter());
  const [password, setPassword] = React.useState(generateCharacter());
  const namaLengkap = React.useRef("");
  const nip = React.useRef("");

  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      namaLengkap: namaLengkap.current.value,
      password,
      nip: nip.current.value,
    };
    try {
      setLoading(true);
      setErrorMessage("");
      const token = secureLocalStorage.getItem("accessToken");
      await axios.post(`${config.API_URL}/operator/add-dosen`, data, {
        headers: {
          "x-access-token": token,
        },
      });

      onClick();
      toast.setToast("Data dosen berhasil ditambahkan", "success");
      refreshData();
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
        onClick={onClick}
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
              Entry Data Akun Dosen
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm"
              data-modal-toggle="entry-modal-modal"
              onClick={onClick}
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
              <InputGenerate
                label="Username"
                id="username"
                type="text"
                name={username}
                onClick={() => setUsername(generateCharacter())}
              />
              <Input
                label="Nama Lengkap"
                id="nama-lengkap"
                type="text"
                innerRef={namaLengkap}
              />
              <Input
                label="NIP"
                id="nip"
                type="number"
                innerRef={nip}
                moreProps={{
                  min: 0,
                }}
              />
              <InputGenerate
                label="Password"
                id="password"
                type="text"
                name={password}
                onClick={() => setPassword(generateCharacter())}
              />
              {errorMessage && <DangerAlert message={errorMessage} />}
              <div className="flex justify-center gap-x-4">
                <OutlinedButton child="Cancel" onClick={onClick} />
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

export default EntryDataDosen;
