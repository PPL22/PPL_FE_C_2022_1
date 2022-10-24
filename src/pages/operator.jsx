import config from '../configs/config.json';
import React from 'react';
import { Charts, EntryData, Spinner } from '../components/components';
import axios from 'axios';

function Operator() {
  const [modal, setModal] = React.useState(false);
  const [dataMahasiswa, setDataMahasiswa] = React.useState({});
  const [dataDosen, setDataDosen] = React.useState([]);

  function showModal() {
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }

  const getDataDosen = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem('accessToken');
    try {
      const url = `${apiUrl}/operator/data-dosen`;
      const response = await axios.get(url, {
        headers: {
          'x-access-token': token,
        },
      });
      const data = response.data.map((item) => {
        return {
          value: item.nip,
          label: item.nama,
        };
      });
      setDataDosen(data);
    } catch (error) {
      throw error;
    }
  };

  const getDataMahasiswa = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem('accessToken');
    try {
      const url = `${apiUrl}/operator/data-mahasiswa`;
      const response = await axios.get(url, {
        headers: {
          'x-access-token': token,
        },
      });
      setDataMahasiswa(response.data);
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    getDataDosen();
    getDataMahasiswa();
  }, []);

  const data = {
    labels: ['Sudah Memiliki Akun', 'Belum Memiliki Akun'],
    colors: ['#5570F1', '#FFCC91'],
    label: 'Jumlah Mahasiswa',
    elements: [
      dataMahasiswa.sudahMemilikiAkun,
      dataMahasiswa.belumMemilikiAkun,
    ],
  };
  return (
    <>
      <section className="flex mt-10 justify-center">
        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
          <div className="div flex justify-between">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              Data Mahasiswa
            </h5>
          </div>
          {data && <Charts data={data} />}
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
      </section>
      {modal && <EntryData onClick={closeModal} dataDosen={dataDosen} />}
    </>
  );
}

export default Operator;
