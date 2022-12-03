import pic from "../assets/images/logo_undip.png";
import profile from "../assets/images/default_profile.png";
import { useState, useEffect, useRef } from "react";
import config from "../configs/config.json";
import axios from "axios";
import { motion } from "framer-motion";
import { Spinner, DangerAlert, DropdownSearch } from "../components/components";
import { useAuth } from "../contexts/AuthContext";
import secureLocalStorage from "react-secure-storage";

const Registration = () => {
  const auth = useAuth();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [kabupaten, setKabupaten] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const alamat = useRef();
  const kodeKab = useRef();
  const noHP = useRef();
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const getDataRegistration = async () => {
    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    try {
      setLoading(true);
      let url;
      if (auth.currentRole === "Mahasiswa") {
        url = `${apiUrl}/mahasiswa/register`;
      } else {
        url = `${apiUrl}/dosen/register`;
      }
      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      setData(response.data.data);
      if (response.data.data.foto != null) {
        if (auth.currentRole === "Mahasiswa") {
          const url = `${config.API_IMAGE_URL}/foto_mhs/${response.data.data.foto}`;
          setFoto(url);
        } else {
          if (response.data.data.foto.includes("http")) {
            setFoto(response.data.data.foto);
          } else {
            const url = `${config.API_IMAGE_URL}/foto_dosen/${response.data.data.foto}`;
            setFoto(url);
          }
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getDataKabupaten = async (keyword) => {
    const apiUrl = config.API_URL;
    try {
      const url = `${apiUrl}/kota?keyword=${keyword ?? ""}`;
      const response = await axios.get(url);
      const data = response.data.map((item) => {
        return {
          value: item.kodeKab,
          label: item.namaKab,
        };
      });
      setKabupaten(data);
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      throw error;
    }
  };

  useEffect(() => {
    getDataRegistration();
    getDataKabupaten();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      setErrorMessage("Password tidak sama");
      return;
    }

    const apiUrl = config.API_URL;
    const token = secureLocalStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("email", email.current.value);
    formData.append("oldUsername", data.username);
    formData.append("username", username.current.value);
    formData.append("password", password.current.value);
    formData.append("alamat", alamat.current.value);
    formData.append("kodeKab", kodeKab.current.props.value.value);
    formData.append("noHP", noHP.current.value);
    formData.append("foto", selectedFile);
    if (auth.currentRole === "Mahasiswa") {
      formData.append("nim", data.nim);
    } else {
      formData.append("nip", data.nip);
    }

    try {
      setIsSubmitted(true);
      let url;
      if (auth.currentRole === "Mahasiswa") {
        url = `${apiUrl}/mahasiswa/update-data`;
      } else {
        url = `${apiUrl}/dosen/update-data`;
      }
      const response = await axios.post(url, formData, {
        headers: {
          "x-access-token": token,
        },
      });
      secureLocalStorage.setItem("firstTime", "false");
      if (selectedFile) {
        secureLocalStorage.setItem("foto", response.data.data.foto);
      }
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response.status === 401) {
        auth.logout();
      }
      setErrorMessage(error.response.data.message);
      throw error;
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <motion.section
          className="h-screen grid grid-cols-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="hidden lg:block lg:col-span-7 bg-acintya-prasada bg-no-repeat bg-cover"></div>
          <div className="col-span-12 lg:col-span-5 bg-background flex justify-center overflow-y-auto pb-60">
            <div className="w-full">
              <div className="mr-10 flex justify-end">
                <div className="flex mt-8">
                  <h1 className="p-4 flex items-center ">
                    Universitas<br></br>Diponegoro
                  </h1>
                  <img
                    alt="logo undip"
                    className="h-28 flex items-center"
                    src={pic}
                  ></img>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="">
                  <h1 className="mt-8 text-center font-medium">
                    Update Data Diri
                  </h1>
                  <p className="mt-2 mb-4 text-center text-gray-400">
                    Silahkan isi data dengan sesuai
                  </p>
                  <form
                    className="flex flex-col w-full space-y-4"
                    autoComplete="off"
                    onSubmit={(e) => formSubmit(e)}
                  >
                    <div className="relative">
                      {" "}
                      <label
                        htmlFor="nama-lengkap"
                        className="text-sm font-medium text-gray-900"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="email"
                        id="nama-lengkap"
                        className="block p-4 w-full text-sm text-gray-600 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        value={data.nama}
                        required
                        disabled
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="id"
                        className="text-sm font-medium text-gray-900"
                      >
                        {auth.currentRole === "Mahasiswa" ? "NIM" : "NIP"}
                      </label>
                      <input
                        type="text"
                        id="id"
                        className="block p-4 w-full text-sm text-gray-600 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        value={
                          auth.currentRole === "Mahasiswa" ? data.nim : data.nip
                        }
                        disabled
                        required
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="email-user"
                        className="text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email-user"
                        className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        placeholder="Email"
                        ref={email}
                        required
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="username"
                        className="text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        defaultValue={data.username}
                        ref={username}
                        required
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        ref={password}
                        required
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-900"
                      >
                        Konfirmasi Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        ref={confirmPassword}
                        required
                      />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="alamat-lengkap"
                        className="text-sm font-medium text-gray-900"
                      >
                        Alamat Lengkap
                      </label>
                      <textarea
                        type="text"
                        id="alamat-lengkap"
                        ref={alamat}
                        className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        placeholder="alamat Lengkap"
                        rows="4"
                        required
                      />
                    </div>

                    <DropdownSearch
                      id="kabupaten"
                      label="Kabupaten/Kota"
                      innerRef={kodeKab}
                      options={kabupaten}
                      onChange={(inputValue) => {
                        setTimeout(() => {
                          getDataKabupaten(inputValue);
                        }, 500);
                      }}
                    />

                    <div className="relative">
                      <label
                        htmlFor="no-handphone"
                        className="text-sm font-medium text-gray-900"
                      >
                        No Handphone
                      </label>
                      <input
                        type="text"
                        id="no-handphone"
                        ref={noHP}
                        className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                        placeholder="No Handphone (+62)"
                        required
                      />
                    </div>

                    {auth.currentRole === "Mahasiswa" && (
                      <>
                        <div className="relative">
                          <label
                            htmlFor="status"
                            className="text-sm font-medium text-gray-900"
                          >
                            Status
                          </label>
                          <input
                            type="text"
                            id="status"
                            className="block p-4 w-full text-sm  text-gray-600 bg-gray-200  rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                            value={data.statusAktif}
                            disabled
                            required
                          />
                        </div>
                        <div className="relative">
                          <label
                            htmlFor="jalur-masuk"
                            className="text-sm font-medium text-gray-900"
                          >
                            Jalur Masuk
                          </label>
                          <input
                            type="text"
                            id="jalur-masuk"
                            className="block p-4 w-full text-sm text-gray-600 bg-gray-200  rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                            value={data.jalurMasuk}
                            disabled
                            required
                          />
                        </div>

                        <div className="relative">
                          <label
                            htmlFor="dosen-wali"
                            className="text-sm font-medium text-gray-900"
                          >
                            Dosen Wali
                          </label>
                          <input
                            type="text"
                            id="dosen-wali"
                            className="block p-4 w-full text-sm text-gray-600 bg-gray-200  rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 "
                            value={data.namaWali}
                            disabled
                            required
                          />
                        </div>
                      </>
                    )}

                    <div className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-blue-500 focus:border-blue-500 ">
                      <div className="">
                        {selectedFile ? (
                          <img
                            className="mx-auto w-[200px] h-[200px] object-cover"
                            width="200"
                            src={preview}
                            alt="foto-mahasiswa"
                          />
                        ) : (
                          <img
                            className="mx-auto rounded w-[200px] h-[200px] object-cover"
                            src={foto ?? profile}
                            alt="foto-profile"
                          />
                          /* Ceritanya profile image default */
                        )}
                        <div className="px-4">
                          <input
                            className="mt-4 max-w-xs"
                            type="file"
                            onChange={onSelectFile}
                            required={foto === null}
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-center">
                      <button
                        className={`${
                          isSubmitted ? "bg-slate-600" : "bg-blue-500"
                        } w-1/2 text-gray-100 py-3 rounded hover:bg-slate-600`}
                        type="submit"
                        disabled={isSubmitted}
                      >
                        {isSubmitted ? "Loading..." : "Update Data"}
                      </button>
                    </div>
                    {errorMessage && <DangerAlert message={errorMessage} />}
                    <div className="h-20"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
};

export default Registration;
