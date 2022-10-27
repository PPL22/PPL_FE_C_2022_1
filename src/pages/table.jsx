import React from "react";
import { TableRekapMahasiswa } from "../components/components";

export default function Table() {
  const data = {
    thead: [
      "Nama Mahasiswa",
      "NIM",
      "Angkatan",
      "Semester",
      "SKS Semester",
      "Status Mahasiswa",
      "Action",
      "Status",
    ],
    tbody: [
      {
        data: ["Janet Adebayo", "24060120130044", "2021", "3", "24", "Aktif"],
      },
      {
        data: ["Janet Adebayo", "24060120130044", "2021", "3", "24", "Aktif"],
      },
      {
        data: ["Janet Adebayo", "24060120130044", "2021", "3", "24", "Aktif"],
      },
      {
        status: "Belum Entry",
        data: ["Janet Adebayo", "24060120130044", "2021", "3", "24", "Aktif"],
      },
    ],
  };
  return (
    <section>
      <TableRekapMahasiswa />
    </section>
  );
}
