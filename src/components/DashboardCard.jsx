import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCurrentYear } from "../utils/time";
import Charts from "./Charts";
import Dropdown from "./Dropdown";

function DashboardCard({ title, updateData, data, path }) {
  const auth = useAuth();
  let isDataExist = data.elements.filter((element) => element !== 0).length > 0;

  const document = path.split("/")[3].toUpperCase();
  return (
    <div className="text-center min-w-[380px] max-w-sm p-6 mx-auto bg-white rounded-lg border border-gray-200 shadow-md">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      <div className="mb-4">
        <Dropdown
          defaultValue={data.angkatan}
          onChange={(value) => updateData(value, document)}
          id="angkatan"
          label={"Angkatan"}
          options={[
            { value: "Semua Angkatan", label: "Semua Angkatan" },
            ...Array.from(
              { length: 7 },
              (_, i) => i + getCurrentYear() - 6
            ).map((item) => ({
              value: item,
              label: item,
            })),
          ]}
        />
      </div>
      {isDataExist ? (
        <Charts data={data} />
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Tidak ada data</p>
        </div>
      )}
      {auth.currentRole === "Dosen" && (
        <div className="flex justify-center">
          {data.elements[1] > 0 && (
            <Link to={path}>
              <button
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4"
                type="button"
                data-modal-toggle="entry-data-modal"
              >
                Validasi
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardCard;
