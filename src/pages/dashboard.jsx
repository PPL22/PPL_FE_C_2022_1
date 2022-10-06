import React from 'react';
import { Charts, EntryData, Header, Sidebar } from '../components/components';
import Dosen from './dosen';

function Dashboard() {
  const [modal, setModal] = React.useState(false);

  function showModal() {
    setModal(true);
    console.log(modal);
  }

  const data = {
    labels: ['Sudah Memiliki Akun', 'Belum Memiliki Akun'],
    colors: ['#5570F1', '#FFCC91'],
    label: 'Jumlah Mahasiswa',
    elements: [200, 100],
  };

  return (
    <>
      <Dosen />
      {/* <section className="flex mt-10 justify-center">
          <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="div flex justify-between">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Data Mahasiswa
              </h5>
            </div>
            <Charts data={data} />
            <div className="flex justify-center">
              <button
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4"
                type="button"
                onClick={showModal}
                data-modal-toggle="entry-data-modal"
              >
                Entry Data
              </button>
            </div>
          </div>
        </section> */}
      {/* {modal && <EntryData setModal={setModal} modal={modal} />} */}
    </>
  );
}

export default Dashboard;
