import React from 'react';
import { Table } from '../../components/components';
import config from '../../configs/config.json';
import axios from 'axios';

function StatusIRSMahasiswa() {
  const [dataIRS, setDataIRS] = React.useState({
    thead: [
      'Nama Mahasiswa',
      'NIM',
      'Angkatan',
      'Semester',
      'SKS Semester',
      'Status Mahasiswa',
      'Action',
      'Status',
    ],
    tbody: [],
  });

  const getDataIRS = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem('accessToken');
    try {
      const url = `${apiUrl}/dosen/status-validasi/irs`;
      const response = await axios.get(url, {
        headers: {
          'x-access-token': token,
        },
      });
      console.log(response);
      setDataIRS({
        ...dataIRS,
        tbody: response.data.data,
      });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    getDataIRS();
  }, []);

  return (
    <section className="mt-10 px-8">
      <h2 className="text-3xl font-bold">Status IRS Mahasiswa</h2>
      <Table data={dataIRS} />
    </section>
  );
}

export default StatusIRSMahasiswa;
