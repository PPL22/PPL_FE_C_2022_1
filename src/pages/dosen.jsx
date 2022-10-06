import React from 'react';
import Charts from '../components/Charts';

function Dosen() {
  const dataIRS = {
    labels: ['Sudah Verifikasi', 'Belum Entry'],
    colors: ['#5570F1', '#FFCC91'],
    label: 'Status IRS Mahasiswa',
    elements: [200, 100],
  };
  const dataKHS = {
    labels: ['Sudah Verifikasi', 'Belum Entry'],
    colors: ['#5570F1', '#FFCC91'],
    label: 'Status KHS Mahasiswa',
    elements: [250, 50],
  };
  const dataPKL = {
    labels: ['Belum Ambil', 'Belum Lulus', 'Lulus'],
    colors: ['#5570F1', '#FFCC91', '#CC5F5F'],
    label: 'Status PKL Mahasiswa',
    elements: [100, 100, 50],
  };
  const dataSkripsi = {
    labels: ['Belum Ambil', 'Belum Lulus', 'Lulus'],
    colors: ['#5570F1', '#FFCC91', '#CC5F5F'],
    label: 'Status Skripsi Mahasiswa',
    elements: [80, 100, 150],
  };
  return (
    <section className="flex flex-wrap justify-evenly my-10 gap-10 items-center lg:px-20">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="div flex justify-between">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Status IRS Mahasiswa
          </h5>
        </div>
        <Charts data={dataIRS} />
        <div className="flex justify-center">
          <button
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4"
            type="button"
            data-modal-toggle="entry-data-modal"
          >
            Validasi
          </button>
        </div>
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="div flex justify-between">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Status PKL Mahasiswa
          </h5>
        </div>
        <Charts data={dataPKL} />
        <div className="flex justify-center">
          <button
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4"
            type="button"
            data-modal-toggle="entry-data-modal"
          >
            Validasi
          </button>
        </div>
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="div flex justify-between">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Status KHS Mahasiswa
          </h5>
        </div>
        <Charts data={dataKHS} />
        <div className="flex justify-center">
          <button
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4"
            type="button"
            data-modal-toggle="entry-data-modal"
          >
            Validasi
          </button>
        </div>
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
        <div className="div flex justify-between">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
            Status Skripsi Mahasiswa
          </h5>
        </div>
        <Charts data={dataSkripsi} />
        <div className="flex justify-center">
          <button
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4"
            type="button"
            data-modal-toggle="entry-data-modal"
          >
            Validasi
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dosen;
