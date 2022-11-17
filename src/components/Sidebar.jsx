import React from "react";
import configs from "../configs/config.json";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import profile from "../assets/images/default_profile.png";
import CollapseMenu from "./CollapseMenu";

function Sidebar() {
  const auth = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const roles = auth.role.split(" ");
  const role = auth.currentRole === null ? roles[0] : auth.currentRole;
  return (
    <div className="fixed top-0 left-0 bottom-0 bg-acintya-prasada bg-cover px-4 mx-auto max-w-[280px] h-full">
      <div className="flex items-center flex-col bg-background bg-cover h-full py-8 text-center">
        <section className="profile flex flex-col items-center px-2">
          <Link to="/dashboard/profile">
            <img
              src={
                auth.foto !== null &&
                auth.foto !== "undefined" &&
                auth.foto !== "null"
                  ? auth.foto.includes("http")
                    ? auth.foto
                    : `${configs.API_IMAGE_URL}/foto_mhs/${auth.foto}`
                  : profile
              }
              alt="foto profil"
              className="rounded-full w-20 h-20 object-cover"
            />
          </Link>
          <h2 className="text-lg font-bold mt-2">{auth.name}</h2>
          <h2 className=" mt-1">Fakultas Sains dan Matematika</h2>
          <h2 className=" ">Informatika</h2>
        </section>
        <nav className="mt-5 flex flex-col gap-y-10 h-full justify-between">
          <div className="flex flex-col gap-y-4">
            <Link
              to="/dashboard"
              className={`${
                pathname === "/dashboard"
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "border border-transparent rounded hover:border-blue-500 text-gray-900"
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-x-2`}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M16.0754 2H19.4614C20.8636 2 21.9999 3.14585 21.9999 4.55996V7.97452C21.9999 9.38864 20.8636 10.5345 19.4614 10.5345H16.0754C14.6731 10.5345 13.5369 9.38864 13.5369 7.97452V4.55996C13.5369 3.14585 14.6731 2 16.0754 2Z"
                  fill={pathname === "/dashboard" ? "#fff" : "#000"}
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                  fill={pathname === "/dashboard" ? "#fff" : "#000"}
                />
              </svg>
              Dashboard
            </Link>
            {role === "Dosen" && (
              <CollapseMenu
                svg={
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z"
                      stroke={
                        pathname.includes("/dashboard/status") ? "#fff" : "#000"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z"
                      stroke={
                        pathname.includes("/dashboard/status") ? "#fff" : "#000"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                label="Status Mahasiswa"
                path="/dashboard/status"
                list={[
                  {
                    name: "IRS",
                    path: "/dashboard/status/irs",
                  },
                  {
                    name: "KHS",
                    path: "/dashboard/status/khs",
                  },
                  {
                    name: "PKL",
                    path: "/dashboard/status/pkl",
                  },
                  {
                    name: "Skripsi",
                    path: "/dashboard/status/skripsi",
                  },
                ]}
              />
            )}
            {(role === "Dosen" || role === "Departemen") && (
              <CollapseMenu
                svg={
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke={
                        pathname.includes("/dashboard/rekap") ? "#fff" : "#000"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 17H8"
                      stroke={
                        pathname.includes("/dashboard/rekap") ? "#fff" : "#000"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 13H8"
                      stroke={
                        pathname.includes("/dashboard/rekap") ? "#fff" : "#000"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 9H9H8"
                      stroke={
                        pathname.includes("/dashboard/rekap") ? "#fff" : "#000"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke={
                        pathname.includes("/dashboard/rekap") ? "#fff" : "#000"
                      }
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                label="Rekap Mahasiswa"
                path="/dashboard/rekap"
                list={[
                  {
                    name: "Status",
                    path: "/dashboard/rekap/status",
                  },
                  {
                    name: "PKL",
                    path: "/dashboard/rekap/pkl",
                  },
                  {
                    name: "Skripsi",
                    path: "/dashboard/rekap/skripsi",
                  },
                ]}
              />
            )}
            {(role === "Dosen" || role === "Departemen") && (
              <Link
                to="/dashboard/data-mahasiswa"
                className={`${
                  pathname === "/dashboard/data-mahasiswa"
                    ? "bg-blue-700 hover:bg-blue-800 text-white"
                    : "border border-transparent rounded hover:border-blue-500 text-gray-900"
                } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-x-2`}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="9.80541"
                    cy="9.80541"
                    r="7.49047"
                    stroke={
                      pathname === "/dashboard/data-mahasiswa" ? "#fff" : "#000"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.0151 15.4043L17.9518 18.3334"
                    stroke={
                      pathname === "/dashboard/data-mahasiswa" ? "#fff" : "#000"
                    }
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Pencarian Mahasiswa
              </Link>
            )}
          </div>
          <button
            type="button"
            onClick={auth.logout}
            className="mt-4 text-red-700  hover:underline focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 inline-flex items-center gap-x-2"
          >
            {" "}
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M2 6.447C2 3.996 4.03024 2 6.52453 2H11.4856C13.9748 2 16 3.99 16 6.437V17.553C16 20.005 13.9698 22 11.4744 22H6.51537C4.02515 22 2 20.01 2 17.563V16.623V6.447Z"
                fill="#CC5F5F"
              />
              <path
                d="M21.779 11.4548L18.9332 8.5458C18.6391 8.2458 18.1657 8.2458 17.8726 8.5478C17.5804 8.8498 17.5814 9.3368 17.8745 9.6368L19.4338 11.2298H17.9388H9.5485C9.13459 11.2298 8.79858 11.5748 8.79858 11.9998C8.79858 12.4258 9.13459 12.7698 9.5485 12.7698H19.4338L17.8745 14.3628C17.5814 14.6628 17.5804 15.1498 17.8726 15.4518C18.0196 15.6028 18.2115 15.6788 18.4043 15.6788C18.5952 15.6788 18.7871 15.6028 18.9332 15.4538L21.779 12.5458C21.9202 12.4008 22 12.2048 22 11.9998C22 11.7958 21.9202 11.5998 21.779 11.4548Z"
                fill="#CC5F5F"
              />
            </svg>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
