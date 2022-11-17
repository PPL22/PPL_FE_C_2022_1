import React from "react";
import Dosen from "./dosen";
import { useAuth } from "../contexts/AuthContext";
import Operator from "./operator";
import Mahasiswa from "./mahasiswa";
import Departemen from "./departemen";
import Dropdown from "../components/Dropdown";

function Dashboard() {
  const auth = useAuth();
  const roles = auth.role.split(" ");
  const role = auth.currentRole === null ? roles[0] : auth.currentRole;

  return (
    <>
      {roles.length > 1 && (
        <div className="flex justify-end px-8">
          <Dropdown
            options={roles.map((role) => {
              return {
                label: role,
                value: role,
              };
            })}
            defaultValue={role}
            label="Role"
            onChange={auth.updateCurrentRole}
          />
        </div>
      )}
      {role === "Operator" && <Operator />}
      {role === "Dosen" && <Dosen />}
      {role === "Departemen" && <Departemen />}
      {role === "Mahasiswa" && <Mahasiswa />}
    </>
  );
}

export default Dashboard;
