import React from 'react';
import pic from '../assets/images/logo_undip.png';
import profile from '../assets/images/default_profile.png';
import { useState, useEffect } from 'react';

const UpdateDataMhs = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

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

  return (
    <section className="h-screen grid grid-cols-12">
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
              <h1 className="mt-8 text-center font-medium">Update Data Diri</h1>
              <p className="mt-2 mb-4 text-center text-gray-400">
                Silahkan isi data dengan sesuai
              </p>
              <form className="flex flex-col w-full space-y-4">
                <label
                  for="nama-lengkap"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="nama-lengkap"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Nama Lengkap"
                    required
                  />
                </div>

                <label
                  for="nim"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  NIM
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="nim"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    value="24060120140134"
                    disabled
                    required
                  />
                </div>

                <label
                  for="email-user"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email-user"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Email"
                    required
                  />
                </div>

                <label
                  for="password"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="password"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    value="*********"
                    disabled
                  />
                </div>

                <label
                  for="tempat-lahir"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Tempat Lahir
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="tempat-lahir"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Tempat Lahir"
                    required
                  />
                </div>

                <label
                  for="tanggal-lahir"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Tanggal Lahir
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="tanggal-lahir"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="tanggal lahir"
                    required
                  />
                </div>

                <label
                  for="alamat-lengkap"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <textarea
                    type="text"
                    id="alamat-lengkap"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="alamat Lengkap"
                    rows="4"
                    required
                  />
                </div>

                <label
                  for="provinsi"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Provinsi
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="provinsi"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Provinsi"
                    required
                  />
                </div>

                <label
                  for="kabupaten"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Kabupaten
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="kabupaten"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Kabupaten/Kota"
                    required
                  />
                </div>

                <label
                  for="no-handphone"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  No Handphone
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="no-handphone"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="No Handphone"
                    required
                  />
                </div>

                <label
                  for="status"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Status
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="status"
                    className="block p-4 pl-10 w-full text-sm  bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    value="Aktif"
                    disabled
                    required
                  />
                </div>

                <label
                  for="jalur-masuk"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Jalur Masuk
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="jalur-masuk"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    value="Mandiri"
                    disabled
                    required
                  />
                </div>

                <label
                  for="dosen-wali"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Dosen Wali
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="dosen-wali"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    value="Aris Pudji Widodo"
                    disabled
                    required
                  />
                </div>

                <div className="block p-4 w-full text-sm text-gray-900 bg-blue-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">
                  <div className="">
                    {selectedFile ? (
                      <img className="mx-auto" width="200" src={preview} />
                    ) : (
                      <img
                        className="mx-auto rounded"
                        width="200"
                        src={profile}
                      />
                      /* Ceritanya profile image default */
                    )}
                    <div className="w-60">
                      <input
                        className="mt-4"
                        type="file"
                        onChange={onSelectFile}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    className="bg-blue-500 w-1/2 text-gray-100 py-3 rounded hover:bg-slate-600"
                    type="submit"
                  >
                    submit
                  </button>
                </div>

                <div className="h-20"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateDataMhs;
