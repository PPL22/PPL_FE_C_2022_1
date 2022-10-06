import React from 'react';
import { Table } from '../components/components';

function StatusMahasiswa() {
  const data = {
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
    tbody: [
      {
        status: 'Belum Entry',
        data: ['Janet Adebayo', '24060120130044', '2021', '3', '24', 'Aktif'],
      },
      {
        status: 'Sudah Entry',
        data: ['Janet Adebayo', '24060120130044', '2021', '3', '24', 'Aktif'],
      },
      {
        status: 'Belum Entry',
        data: ['Janet Adebayo', '24060120130044', '2021', '3', '24', 'Aktif'],
      },
      {
        status: 'Belum Entry',
        data: ['Janet Adebayo', '24060120130044', '2021', '3', '24', 'Aktif'],
      },
    ],
  };

  return (
    <section className="mt-10 px-8">
      <h2 className="text-3xl font-bold">Status IRS Mahasiswa</h2>
      <Table data={data} />
    </section>
  );
}

export default StatusMahasiswa;
