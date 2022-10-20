import React from 'react';
import { Spinner } from '../../../components/components';
import config from '../../../configs/config.json';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { statusAktifColor } from '../../../utils/statusAktifColor';

function RekapStatusMahasiswa() {
  const auth = useAuth();
  const [rekapStatus, setRekapStatus] = React.useState({
    thead: [
      'Angkatan',
      'Aktif',
      'Mangkir',
      'Cuti',
      'Dropout',
      'Undur Diri',
      'Lulus',
      'Meninggal Dunia',
    ],
    tbody: [],
  });
  const [daftarStatus, setDaftarStatus] = React.useState({
    thead: [
      'No',
      'Nama Mahasiswa',
      'NIM',
      'Angkatan',
      'IP Kumulatif',
      'SKS Kumulatif',
      'Status Mahasiswa',
    ],
    tbody: [],
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const getRekapStatus = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem('accessToken');
    try {
      const url = `${apiUrl}/${
        auth?.role.includes('Dosen') ? 'dosen' : 'departemen'
      }/rekap/status`;
      const response = await axios.get(url, {
        headers: {
          'x-access-token': token,
        },
      });
      const result = response.data.data.map((item) => {
        return {
          data: [
            item.angkatan,
            item.aktif,
            item.mangkir,
            item.cuti,
            item.dropout,
            item.undurDiri,
            item.lulus,
            item.meninggalDunia,
          ],
        };
      });
      setRekapStatus({
        ...rekapStatus,
        tbody: result,
      });
    } catch (error) {
      throw error;
    }
  };

  const getDaftarStatus = async () => {
    const apiUrl = config.API_URL;
    const token = localStorage.getItem('accessToken');
    try {
      const url = `${apiUrl}/${
        auth?.role.includes('Dosen') ? 'dosen' : 'departemen'
      }/daftar-status`;
      const response = await axios.get(url, {
        headers: {
          'x-access-token': token,
        },
      });
      const result = response.data.data.map((item, index) => {
        return {
          data: [
            index + 1,
            item.nama,
            item.nim,
            item.angkatan,
            item.ipk,
            item.jumlahSksKumulatif,
            item.statusAktif,
          ],
        };
      });
      setDaftarStatus({
        ...daftarStatus,
        tbody: result,
      });
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    setIsLoading(true);
    getRekapStatus();
    getDaftarStatus();
    setIsLoading(false);
  }, []);

  return (
    <div className="overflow-x-auto relative my-10">
      <h1 className="text-center font-bold text-xl mb-8">
        Rekap Progress Status Mahasiswa Informatika Fakultas Sains dan
        Matematika UNDIP SEMARANG
      </h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="px-4">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-gray-500 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {rekapStatus.thead.map((item, index) => {
                    return (
                      <th scope="col" className="py-3 px-6" key={index}>
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rekapStatus.tbody.map((body, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {body.data.map((item, index) => {
                      return (
                        <td key={index} className="py-4 px-2">
                          {item}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
            <table className="w-full text-sm text-gray-500 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {daftarStatus.thead.map((item, index) => {
                    return (
                      <th scope="col" className="py-3 px-6" key={index}>
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {daftarStatus.tbody.map((body, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {body.data.map((item, index) => {
                      return (
                        <td key={index} className="py-4 px-2">
                          <div
                            className={`${
                              index === 6 && statusAktifColor(item)
                            }`}
                          >
                            {item}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default RekapStatusMahasiswa;