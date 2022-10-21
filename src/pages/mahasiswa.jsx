import React from 'react';
import EntryDataMhs from '../components/EntryDataMhs';
import config from '../configs/config.json';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { statusAktifColor } from '../utils/statusAktifColor';

function Mahasiswa() {
  const [modal, setModal] = React.useState(false);
  const [entryState, setEntryState] = React.useState('none');
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  function showModal(entry) {
    setModal(true);
    setEntryState(entry);
  }

  const getDashboard = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem('accessToken');
    try {
      setIsLoading(true);
      const url = `${apiUrl}/mahasiswa/dashboard`;
      const response = await axios.get(url, {
        headers: {
          'x-access-token': token,
        },
      });
      const result = response.data;
      setData(result);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getDashboard();
  }, []);

  return isLoading || !data ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className="grid grid-cols-12 mt-10">
      <div className="col-span-8 flex justify-center">
        <div className="space-y-6">
          <div className="p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-center">
              <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Prestasi Akademik
              </h1>
            </div>
            <div className="flex justify-between">
              <div className="w-40 bg-gradient-to-tr w-30 py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                  IPK
                </h1>
                <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                  {data.ipkNow}
                </h1>
              </div>
              <div className="w-40 bg-gradient-to-tr py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                  SKSks
                </h1>
                <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                  {data.sksNow}
                </h1>
              </div>
            </div>
          </div>
          <div className="p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-center mb-4">
              <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                Status Akademik
              </h1>
            </div>
            <div className="flex justify-center gap-x-4 mb-4">
              <img
                src={data.fotoDoswal}
                alt="foto profil"
                className="rounded-full w-20 h-20 object-cover"
              />
              <div>
                <h2 className="text-lg font-bold mt-2">
                  Dosen Wali : {data.namaDoswal}
                </h2>
                <h2 className="mt-1">NIP : {data.nipDoswal}</h2>
              </div>
            </div>
            <div className="flex justify-center gap-x-10">
              <div className="w-40 bg-gradient-to-tr w-30 py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                  Semester
                </h1>
                <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                  {data.semester}
                </h1>
              </div>
              <div className="w-40 bg-gradient-to-tr py-2 from-blue-700 to-purple-600 rounded-lg">
                <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900">
                  Status
                </h1>
                <div
                  className={`${statusAktifColor(
                    data.statusAktif
                  )} text-center py-2 text-lg`}
                >
                  {data.statusAktif}
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
              className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded-lg flex justify-center items-center
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
              className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded-lg flex justify-center items-center"
            >
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Entry KHS
              </h1>
            </button>
            <button
              type="button"
              onClick={() => showModal('pkl')}
              className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded-lg flex justify-center items-center"
            >
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Entry PKL
              </h1>
            </button>
            <button
              type="button"
              onClick={() => showModal('skripsi')}
              className="row-span-2 w-40 bg-gradient-to-br py-2 from-green-400 to-cyan-400 rounded-lg flex justify-center items-center"
            >
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Entry Skripsi
              </h1>
            </button>
          </div>
        </div>
      </div>
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

export default Mahasiswa;
