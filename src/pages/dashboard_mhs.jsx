import React from 'react';
import { Header, Sidebar } from '../components/components';
import EntryDataMhs from '../components/EntryDataMhs';

function DashboardMhs() {
  const [modal, setModal] = React.useState(false);
  const [entryState, setEntryState] = React.useState('none');

  function showModal(entry) {
    setModal(true);
    setEntryState(entry);
  }

  const data = {
    labels: ['Sudah Memiliki Akun', 'Belum Memiliki Akun'],
    colors: ['#5570F1', '#FFCC91'],
    label: 'Jumlah Mahasiswa',
    elements: [200, 100],
  };

  return (
    <section className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-2 relative">
        <Sidebar />
      </div>
      <div className="col-span-10 h-full bg-background ml-[32px]">
        <Header />
        <section className="grid grid-cols-12 mt-10">
          <div className="col-span-8 flex justify-center">
            <div className="space-y-6">
              <div className="p-6 w-96 bg-white rounded-lg border border-gray-200 shadow-md">
                <div className="flex justify-center">
                  <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Prestasi Akademik
                  </h1>
                </div>
                <div className="flex justify-between">
                  <div className="w-40 bg-gradient-to-tr w-30 py-2 from-blue-700 to-purple-600 rounded">
                    <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                      IPK
                    </h1>
                    <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                      3.89
                    </h1>
                  </div>
                  <div className="w-40 bg-gradient-to-tr py-2 from-blue-700 to-purple-600 rounded">
                    <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                      SKSks
                    </h1>
                    <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                      121
                    </h1>
                  </div>
                </div>
              </div>
              <div className="p-6 w-96 bg-white rounded-lg border border-gray-200 shadow-md">
                <div className="flex justify-center">
                  <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Status Akademik
                  </h1>
                </div>
                <div className="grid grid-cols-6 ">
                  <div className="col-span-2 flex m-auto">
                    <img
                      src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg"
                      alt="foto profil"
                      className="rounded-full w-20 h-20 object-cover"
                    />
                  </div>
                  <div className="col-span-4 ">
                    <h2 className="text-lg font-bold mt-2">John Doe</h2>
                    <h2 className=" mt-1">Fakultas Sains dan Matematika</h2>
                    <h2 className=" ">Informatika</h2>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="w-40 bg-gradient-to-tr w-30 py-2 from-blue-700 to-purple-600 rounded">
                    <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                      Semester
                    </h1>
                    <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                      5
                    </h1>
                  </div>
                  <div className="w-40 bg-gradient-to-tr py-2 from-blue-700 to-purple-600 rounded">
                    <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                      Status
                    </h1>
                    <div className="mx-6 bg-green-500  rounded">
                      <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-slate-100">
                        Aktif
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="h-full p-6 w-96 bg-white rounded-lg border border-gray-200 shadow-md flex justify-center">
              <div className="grid grid-rows-9 space-y-6">
                <div className="row-span-1">
                  <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    Prestasi Akademik
                  </h1>
                </div>
                <button
                  className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded flex justify-center items-center
                "
                  type="button"
                  onClick={() => showModal('irs')}
                >
                  <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    Entry IRS
                  </h1>
                </button>
                <button
                  type="button"
                  onClick={() => showModal('khs')}
                  className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded flex justify-center items-center"
                >
                  <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    Entry KHS
                  </h1>
                </button>
                <button
                  type="button"
                  onClick={() => showModal('pkl')}
                  className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded flex justify-center items-center"
                >
                  <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    Entry PKL
                  </h1>
                </button>
                <button
                  type="button"
                  onClick={() => showModal('skripsi')}
                  className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded flex justify-center items-center"
                >
                  <h1 className="text-xl font-bold tracking-tight text-gray-900">
                    Entry Skripsi
                  </h1>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {}
      {modal && (
        <EntryDataMhs
          setModal={setModal}
          modal={modal}
          setEntryState={setEntryState}
          entryState={entryState}
        />
      )}
    </section>
  );
}

export default DashboardMhs;
