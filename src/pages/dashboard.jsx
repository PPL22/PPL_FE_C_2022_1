import React from 'react';
import { Header, Sidebar } from '../components/components';
import Dosen from './dosen';
import { useAuth } from '../contexts/AuthContext';
import Operator from './operator';

function Dashboard() {
  const auth = useAuth();
  const role = auth.role || '';

  return (
    <>
      <section className="grid grid-cols-12 h-screen overflow-hidden">
        <div className="col-span-2 relative">
          <Sidebar />
        </div>
        <div className="col-span-10 h-full bg-background ml-[100px] lg:ml-[32px]">
          <Header />
          {role.includes('Operator') && <Operator />}
        </div>
      </section>
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
