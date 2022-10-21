import React from 'react';
import Dosen from './dosen';
import { useAuth } from '../contexts/AuthContext';
import Operator from './operator';
import Mahasiswa from './mahasiswa';
import Departemen from './departemen';

function Dashboard() {
  const auth = useAuth();
  const role = auth.role || '';

  return (
    <>
      {role?.includes('Operator') && <Operator />}
      {role?.includes('Dosen') && <Dosen />}
      {role?.includes('Departemen') && <Departemen />}
      {role?.includes('Mahasiswa') && <Mahasiswa />}
    </>
  );
}

export default Dashboard;
