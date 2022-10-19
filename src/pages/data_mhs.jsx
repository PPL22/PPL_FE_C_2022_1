import React from 'react';
import { Header, Sidebar } from '../components/components';

export default function DataMhs() {
  return (
    <section className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-2 relative">
        <Sidebar />
      </div>
      <div className="col-span-10 h-full bg-background ml-[32px]">
        <Header />
      </div>
    </section>
  );
}
