import React from 'react';
import { motion } from 'framer-motion';
import Input from './Input';
import { Dropdown, DropdownSearch, OutlinedButton, Button } from './components';

function EntryData({ modal, setModal }) {
  function closeModal() {
    setModal(false);
    console.log(modal);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      id="entry-data-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-full flex justify-center"
    >
      <div
        onClick={closeModal}
        className="fixed left-0 top-0 bottom-0 right-0 bg-black/20"
      ></div>
      <div className="relative p-4 w-full max-w-md h-full md:h-auto z-10">
        <div className="relative bg-background rounded-lg shadow">
          <div className="flex justify-between items-center pt-6 px-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Entry Data Akun Mahasiswa
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
            <form className="space-y-6" action="#">
              <Input label="Nama Lengkap" id="nama-lengkap" type="text" />
              <Input label="NIM" id="nim" type="number" />
              <Input label="Password" id="password" type="password" />
              <Dropdown
                label="Status"
                id="status"
                options={[
                  {
                    value: 'aktif',
                    label: 'Aktif',
                  },
                  {
                    value: 'tidak-aktif',
                    label: 'Tidak Aktif',
                  },
                  {
                    value: 'drop-out',
                    label: 'Drop Out',
                  },
                  {
                    value: 'mengundurkan-diri',
                    label: 'Mengundurkan Diri',
                  },
                ]}
              />
              <Dropdown
                label="Jalur Masuk"
                id="jalur-masuk"
                options={[
                  {
                    value: 'snmptn',
                    label: 'SNMPTN',
                  },
                  {
                    value: 'sbpmtn',
                    label: 'SBMPTN',
                  },
                  {
                    value: 'mandiri',
                    label: 'Mandiri',
                  },
                  {
                    value: 'lainnya',
                    label: 'Lainnya',
                  },
                ]}
              />
              <DropdownSearch
                id="dosen-wali"
                label="Dosen Wali"
                type="text"
                options={['Aris Pudji', 'Retno Kusuma', 'Dinar Mutiara']}
              />
              <div className="flex justify-center gap-x-4">
                <OutlinedButton child="Cancel" onClick={closeModal} />
                <Button type="submit" child="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EntryData;
