import React from 'react';
import { Header, Sidebar } from '../components/components';
import { useAuth } from '../contexts/AuthContext';
import Operator from './operator';

function Dashboard() {
  const auth = useAuth();
  const role = auth.role || '';

  return (
    <section className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-2 relative">
        <Sidebar />
      </div>
      <div className="col-span-10 h-full bg-background ml-[100px] lg:ml-[32px]">
        <Header />
        {role.includes('Operator') && <Operator />}
      </div>
    </section>
  );
}

export default Dashboard;
