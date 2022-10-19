import { data } from 'autoprefixer';
import React from 'react';
import { Card, Button } from 'flowbite-react';
import {
  Header,
  Sidebar,
  Keterangan,
  BtnSemester,
} from '../components/components';

export default function DataMhs() {
  const data = [
    'irs',
    'irs',
    'irs',
    'irs',
    'irs',
    'pkl',
    'cuti',
    'skripsi',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  return (
    <section className="grid grid-cols-12 h-screen overflow-x-auto">
      <div className="hidden lg:block lg:col-span-2 relative">
        <Sidebar />
      </div>
      <div className="col-span-12 lg:col-span-10 h-full bg-background mx-[32px]">
        <Header />
        <div className="mt-4 flex justify-center">
          <div>
            <input
              className="w-full"
              type="text"
              placeholder="Cari Nama atau NIM Mahasiswa"
              onChange={() => {}}
            ></input>

            <h1 className="text-2xl font-bold mt-4 text-center">
              Data Mahasiswa
            </h1>
            <section className="flex justify-center">
              <div className="grid grid-cols-6 mt-6 ">
                <div className="col-span-2 flex m-auto">
                  <img
                    src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg"
                    alt="foto profil"
                    className="rounded-full w-20 h-20 object-cover"
                  />
                </div>
                <div className="col-span-4">
                  <tr>
                    <td className="text-lg font-bold mt-2">Nama</td>
                    <td className="text-lg font-bold mt-2 px-2">:</td>
                    <td className="">John Doe</td>
                  </tr>
                  <tr>
                    <td className="text-lg font-bold mt-2">Nim</td>
                    <td className="text-lg font-bold mt-2 px-2">:</td>
                    <td className="">240601200014</td>
                  </tr>
                  <tr>
                    <td className="text-lg font-bold mt-2">Angkatan</td>
                    <td className="text-lg font-bold mt-2 px-2">:</td>
                    <td className="">2018</td>
                  </tr>
                  <tr>
                    <td className="text-lg font-bold mt-2">Dosen Wali</td>
                    <td className="text-lg font-bold mt-2 px-2">:</td>
                    <td className="">Aris Pudji</td>
                  </tr>
                </div>
              </div>
            </section>
            <h1 className="text-2xl font-bold mt-6 text-center">Semester</h1>
            <section className="mx-12 mt-4 grid grid-cols-7 gap-3">
              {data.map((e, index) => {
                return (
                  <div className="col-span-1">
                    <BtnSemester status={e} child={index + 1} />
                  </div>
                );
              })}
            </section>
            <h1 className="mx-10 text-mg font-bold mt-2 text-start">
              Keterangan
            </h1>
            <div className="mx-10 flex gap-x-4">
              <div>
                <Keterangan
                  color={'bg-blue-500'}
                  child={'Sudah diisikan atau digunakan'}
                />
                <Keterangan
                  color={'bg-yellow-300'}
                  child={'Sudah diisikan PKL (IRS, KHS, PKL)'}
                />
              </div>
              <div>
                <Keterangan
                  color={'bg-red-500'}
                  child={'Belum diisikan atau digunakan'}
                />
                <Keterangan
                  color={'bg-green-500'}
                  child={'Sudah diisikan skripsi'}
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-4 text-center">
              Data Mahasiswa
            </h1>
            <section className="py-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-3">
              <Card>
                <div className="h-full grid grid-cols-1 content-between">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    IRS
                  </h5>
                  <p className="py-4 font-semibold text-2xl tracking-tight text-gray-900 text-center">
                    24 SKS
                  </p>
                  <Button>Lihat Dokumen</Button>
                </div>
              </Card>
              <Card>
                <div className="h-full grid grid-cols-1 content-between">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    KHS
                  </h5>
                  <div className="text-base py-4 flex justify-center gap-x-1 text-mg tracking-tight text-gray-900">
                    <div className="font-semibold">
                      <div>SKS Semester</div>
                      <div>IP Semester</div>
                      <div>SKS Kumulatif</div>
                      <div>IP Kumulatif</div>
                    </div>
                    <div className="font-semibold">
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                    </div>
                    <div>
                      <div>24</div>
                      <div>3.78</div>
                      <div>96</div>
                      <div>3.81</div>
                    </div>
                  </div>
                  <Button>Lihat Dokumen</Button>
                </div>
              </Card>
              <Card>
                <div className="h-full grid grid-cols-1 content-between">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center text-center">
                    PKL
                  </h5>
                  <div className="grid grid-cols-2 space-x-4 py-4 text-2xl tracking-tight text-gray-900 text-center">
                    <div className="col-span-1">
                      <div className="font-bold">Nilai</div>
                      <div className="mt-2">B</div>
                    </div>
                    <div className="col-span-1">
                      <div className="font-bold">Status</div>
                      <div className="mt-2">Lulus</div>
                    </div>
                  </div>
                  <Button>Lihat Dokumen</Button>
                </div>
              </Card>
              <Card>
                <div className="h-full grid grid-cols-1 content-between">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    SKRIPSI
                  </h5>
                  <div className="text-sm py-4 flex gap-x-1 text-mg tracking-tight text-gray-900">
                    <div className="font-semibold">
                      <div>Nilai</div>
                      <div>Status</div>
                      <div>Tanggal sidang</div>
                      <div>Tanggal lulus</div>
                    </div>
                    <div className="font-semibold">
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                      <div>:</div>
                    </div>
                    <div>
                      <div>A</div>
                      <div>Lulus</div>
                      <div>6 Oktober 2020</div>
                      <div>20 Oktober 2020</div>
                    </div>
                  </div>
                  <Button>Lihat Dokumen</Button>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
